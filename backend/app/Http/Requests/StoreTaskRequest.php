<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => 'sometimes|integer|exists:tasks,id',
            'title' => 'required|string|max:100',
            'description' => 'required|string|max:255',
            'priority' => 'required|nullable|integer',
            'due_date' => 'required|date',
            'project_id' => 'required|integer|exists:projects,id'
        ];
    }
}
