// const path = require('path');
// const fs = require('fs');
// var formidable = require('formidable');

module.exports = function(formidable, Studio, aws){
    return {
        SetRouting: function(router){
            router.get('/dashboard', this.adminPage);

            router.post('/uploadFile', aws.Upload.any(), this.uploadFile);
            router.post('/dashboard', this.adminPostPage);
        },
        adminPage: function(req, res){
            res.render('admin/dashboard');
        },

        adminPostPage: function(req, res){
            const newStudio = new Studio();
            newStudio.name = req.body.name;
            newStudio.role = req.body.role;
            newStudio.image = req.body.upload;
            newStudio.save((err) => {
                res.render('admin/dashboard');
            })
        },
        uploadFile: function (req, res){
            const form = new formidable.IncomingForm();
            // form.uploadDir = path.join(__dirname, '../public/uploads');
            form.on('file', (field, file) => {
                // fs.rename(file.path, path.join(form.uploadDir, file.name), (err) => {
                //     if(err) throw err;
                //     console.log('file renamed successfully');
                // })
            });

            form.on('error', (err) => {
                console.log(err)
            });

            form.on('end', () => {
                console.log('file upload is successfully');
            });

            form.parse(req);
        }
    }
}









