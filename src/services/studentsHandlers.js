import { post, put, remove } from "./api";

const CREATE_ENDPOINT = "/Student/AddStudent";
const UPDATE_ENDPOINT = "/Student/UpdateStudent";
const DELETE_ENDPOINT = "/Student/DeleteStudent";

export async function createStudent(formData) {
  try {
    const data = Object.fromEntries(formData);
    const update = await post(`${CREATE_ENDPOINT}`, data);
    if (update.ok) {
      return { ok: true };
    } else {
      return {
        ok: false,
        status: update.status,
        description: update.statusText,
      };
    }
  } catch (error) {
    return {
      ok: false,
      description: error.message,
    };
  }
}

export async function editStudent(id, formData) {
  try {
    const data = Object.fromEntries(formData);
    const update = await put(`${UPDATE_ENDPOINT}/${id}`, data);
    if (update.ok) {
      return { ok: true };
    } else {
      return {
        ok: false,
        status: update.status,
        description: update.statusText,
      };
    }
  } catch (error) {
    return {
      ok: false,
      description: error.message,
    };
  }
}

export async function removeStudent(id) {
  try {
    const update = await remove(`${DELETE_ENDPOINT}/${id}`);
    if (update.ok) {
      return { ok: true };
    } else {
      return {
        ok: false,
        status: update.status,
        description: update.statusText,
      };
    }
  } catch (error) {
    return {
      ok: false,
      description: error.message,
    };
  }
}
