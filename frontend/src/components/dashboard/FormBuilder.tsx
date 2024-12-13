import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, GripVertical } from 'lucide-react';

// Types matching backend schema
type FieldType = 'text' | 'number' | 'email' | 'date' | 'checkbox' | 'dropdown' | 'radio';

interface FormField {
    id: string;
    fieldType: FieldType;
    label: string;
    placeholder?: string;
    isRequired: boolean;
    defaultValue?: string;
    options?: string[];
    order: number;
}

const FIELD_TYPES: FieldType[] = ['text', 'number', 'email', 'date', 'checkbox', 'dropdown', 'radio'];

const FormBuilder: React.FC = () => {
    const [formTitle, setFormTitle] = useState('');
    const [formDescription, setFormDescription] = useState('');
    const [fields, setFields] = useState<FormField[]>([]);

    const addField = (type: FieldType) => {
        const newField: FormField = {
            id: `field-${Date.now()}`,
            fieldType: type,
            label: `${type.charAt(0).toUpperCase() + type.slice(1)} Input`,
            placeholder: '',
            isRequired: false,
            defaultValue: '',
            options: type === 'dropdown' || type === 'radio' ? ['Option 1', 'Option 2'] : undefined,
            order: fields.length
        };
        setFields([...fields, newField]);
    };

    const updateField = (id: string, updates: Partial<FormField>) => {
        setFields(fields.map(field =>
            field.id === id ? { ...field, ...updates } : field
        ));
    };

    const removeField = (id: string) => {
        setFields(fields.filter(field => field.id !== id));
    };

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const reorderedFields = Array.from(fields);
        const [reorderedItem] = reorderedFields.splice(result.source.index, 1);
        reorderedFields.splice(result.destination.index, 0, reorderedItem);

        // Update order
        const updatedFields = reorderedFields.map((field, index) => ({
            ...field,
            order: index
        }));

        setFields(updatedFields);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/form/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: formTitle,
                    description: formDescription,
                    userId: 1, // TODO: Replace with actual user ID
                    formFields: fields.map(field => ({
                        fieldType: field.fieldType,
                        label: field.label,
                        placeholder: field.placeholder,
                        isRequired: field.isRequired,
                        defaultValue: field.defaultValue,
                        options: field.options,
                        order: field.order
                    }))
                })
            });

            if (response.ok) {
                alert('Form created successfully!');
                // Reset form or navigate away
            } else {
                alert('Failed to create form');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form');
        }
    };

    const renderFieldEditor = (field: FormField) => {
        return (
            <Card className="mb-4">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>{field.fieldType.charAt(0).toUpperCase() + field.fieldType.slice(1)} Field</CardTitle>
                    <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeField(field.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <Input
                            label="Label"
                            value={field.label}
                            onChange={(e) => updateField(field.id, { label: e.target.value })}
                        />
                        <Input
                            label="Placeholder"
                            value={field.placeholder}
                            onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                        />
                        <Checkbox
                            label="Required"
                            checked={field.isRequired}
                            onCheckedChange={(checked) => updateField(field.id, { isRequired: !!checked })}
                        />

                        {(field.fieldType === 'dropdown' || field.fieldType === 'radio') && (
                            <div>
                                <label className="block text-sm font-medium mb-2">Options</label>
                                {field.options?.map((option, index) => (
                                    <div key={index} className="flex items-center space-x-2 mb-2">
                                        <Input
                                            value={option}
                                            onChange={(e) => {
                                                const newOptions = [...(field.options || [])];
                                                newOptions[index] = e.target.value;
                                                updateField(field.id, { options: newOptions });
                                            }}
                                        />
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => {
                                                const newOptions = field.options?.filter((_, i) => i !== index);
                                                updateField(field.id, { options: newOptions });
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    onClick={() => {
                                        const newOptions = [...(field.options || []), 'New Option'];
                                        updateField(field.id, { options: newOptions });
                                    }}
                                >
                                    <Plus className="mr-2 h-4 w-4" /> Add Option
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Form Builder</h1>

            {/* Form Metadata */}
            <Card className="mb-6">
                <CardContent className="grid gap-4">
                    <Input
                        label="Form Title"
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        placeholder="Enter form title"
                        className='mt-6'
                    />
                    <Input
                        label="Form Description"
                        value={formDescription}
                        onChange={(e) => setFormDescription(e.target.value)}
                        placeholder="Enter form description"
                    />
                </CardContent>
            </Card>

            {/* Field Type Selection */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Add Fields</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {FIELD_TYPES.map(type => (
                        <Button
                            key={type}
                            variant="outline"
                            onClick={() => addField(type)}
                        >
                            <Plus className="mr-2 h-4 w-4" /> {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Button>
                    ))}
                </CardContent>
            </Card>

            {/* Draggable Fields */}
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="form-fields">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {fields.map((field, index) => (
                                <Draggable key={field.id} draggableId={field.id} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            className="flex items-center mb-4"
                                        >
                                            <div
                                                {...provided.dragHandleProps}
                                                className="mr-2 cursor-move"
                                            >
                                                <GripVertical className="h-5 w-5 text-gray-500" />
                                            </div>
                                            {renderFieldEditor(field)}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            {/* Submit Button */}
            <Button
                onClick={handleSubmit}
                disabled={!formTitle || fields.length === 0}
            >
                Create Form
            </Button>
        </div>
    );
};

export default FormBuilder;