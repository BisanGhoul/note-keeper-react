const API_URL = 'http://localhost:3000/notes';

// Create a new note
export const createNote = async (note) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });

    if (!response.ok) {
      throw new Error('Failed to create note');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error.message || 'An error occurred while creating the note';
  }
};

// Get all notes
export const getNotes = async (page = 1, limit = 100) => {
  try {
    const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch notes');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error.message || 'An error occurred while fetching notes';
  }
};

// Get all notes
export const filterNotes = async (query = "", page = 1, limit = 100) => {
    try {
      const response = await fetch(`${API_URL}/search?query=${query}&page=${page}&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw error.message || 'An error occurred while fetching notes';
    }
  };

// Update an existing note
export const updateNote = async (noteId, updatedNote) => {
  try {
    const response = await fetch(`${API_URL}/${noteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedNote),
    });

    if (!response.ok) {
      throw new Error('Failed to update note');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error.message || 'An error occurred while updating the note';
  }
};

// Partially update a note
export const patchNote = async (noteId, updatedFields) => {
  try {
    const response = await fetch(`${API_URL}/${noteId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFields),
    });

    if (!response.ok) {
      throw new Error('Failed to update note');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error.message || 'An error occurred while partially updating the note';
  }
};

// Delete a note
export const deleteNote = async (noteId) => {
  try {
    const response = await fetch(`${API_URL}/${noteId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete note');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error.message || 'An error occurred while deleting the note';
  }
};
