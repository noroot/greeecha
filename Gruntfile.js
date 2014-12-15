module.exports = function (grunt) {
    // конфиг
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'), 
 
        jshint: {     
          options: {
            curly: true,
            eqeqeq: true,
            immed: true,
            latedef: true,
            newcap: true,
            noarg: true,
            sub: true,
            undef: true,
            eqnull: true,
            browser: true,
            globals: {
              jQuery: true,
              $: true,
              console: true
            }
          },
          '<%= pkg.name %>': {  //вставляем название проекта из package.json
            dev: [ 'dev/js/**/*.js' ]  //какие файлы надо проверять
          }
        },
 
        concat: {  //описываем работу плагина конкатенации
            dist: {
                src: ['dev/js/main.js', 'dev/js/script.js'],  // какие файлы конкатенировать
                dest: 'assets/js/build.js'  // куда класть файл, который получиться после процесса конкатенации 
            }
        },
 
        uglify: {  //описываем работу плагина минификации js - uglify.
            options: {
                stripBanners: true,
                banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n' //комментарий который будет в минифицированном файле.
            },
 
            build: {
                src: 'assets/js/build.js',  // какой файл минифицировать
                dest: 'assets/js/build.min.js' // куда класть файл, который получиться после процесса минификации
            }
        },

        sass: {
            dist: {
              files: {
                'dev/css/style.css': 'dev/css/style.sass'
              }
            }
          },
        cssmin: { //описываем работу плагина минификации и конкатенации css.
            with_banner: {
                options: {
                    banner: '/*  <%= pkg.name %> - v<%= pkg.version %> - minified CSS */'  //комментарий который будет в output файле.
                },
 
                files: {
                    'assets/css/style.min.css' : ['dev/css/style.css']   // первая строка - output файл. массив из строк, какие файлы конкатенировать и минифицировать.
                }
            }
        },
 
        watch: { //описываем работу плагина слежки за файлами.
            scripts: {
                files: ['dev/js/*.js'],  //следить за всеми js файлами в папке dev
                tasks: ['jshint', 'sass', 'concat', 'uglify', 'removelogging']  //при их изменении запускать следующие задачи
            },
            css: {
                files: ['dev/css/*.css', 'dev/css/*.sass'], //следить за всеми css файлами в папке dev
                tasks: ['sass', 'cssmin'] //при их изменении запускать следующую задачу
            }
        },
 
 
        removelogging: { 
            dist: {
              src: "assets/js/build.min.js", // файл который надо отчистить от console.log
          	  dest: "assets/js/build.clean.js" // выходной файл, который получим после очистки
            }
        }
 
 
    });
 
    //подгружаем
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-remove-logging');
 

    grunt.registerTask('default', ['jshint', 'sass', 'concat', 'uglify', 'cssmin', 'removelogging', 'watch']);
};