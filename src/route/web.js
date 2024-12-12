import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import doctorController from '../controllers/doctorController';

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/about", homeController.getAboutPage);
    router.get("/crud", homeController.getCRUD);

    router.post("/post-crud", homeController.postCRUD);

    router.get("/get-crud", homeController.displayGetCRUD);
    router.get("/edit-crud", homeController.getEditCRUD);
    router.post("/put-crud", homeController.putCRUD);
    router.get("/delete-crud", homeController.deleteCRUD);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers); //api lay tat ca nguoi dung 
    router.post('/api/create-new-user', userController.handleCreateNewUser); //api tao moi nguoi dung (lay du lieu tu la post)
    router.put('/api/edit-user', userController.handleEditUser); //api sua nguoi dung (sua doi du lieu dung put)
    router.delete('/api/delete-user', userController.handleDeleteUser); //api xoa nguoi dung (xoa du lieu dung delete)
    //rest api

    router.get('/api/allcode', userController.getAllCode);

    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
    return app.use("/", router);
};
module.exports = initWebRoutes;