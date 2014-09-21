module.exports = function(grunt) {
    //Configuracion del Projecto
    grunt.initConfig({
        //verifica si no hay errores
        jshint:{
            all:['public/javascripts/flappy.js', 'public/javascripts/main.js']
        },

        //concatena todos los archivos en uno solo
        concat:{
            dist:{
                src:['public/javascripts/flappy.js', 'public/javascripts/main.js'],
                dest: 'public/javascripts/all.js'
            }
        },

        //comprime el codigo
        uglify:{
            dist:{
                src:'public/javascripts/all.js',
                dest: 'public/javascripts/minified/all.min.js'
            }
        }
    });
    //cargamos las dependencias
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //registrar las tareas
    grunt.registerTask('default', ['jshint','concat','uglify']);
};