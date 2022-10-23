import services from "@services/profesor/index";

const { baseProfesorURI, profesorURI } = services();

const profesor = (client) => ({
  getTeachers: () => client.get(baseProfesorURI),
  getTeacherById: (id) => client.get(profesorURI.replace(":id", id)),
  deleteTeacher: (id) => client.delete(profesorURI.replace(":id", id)),
});

export default profesor;
