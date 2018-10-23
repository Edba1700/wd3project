'use strict';

const gulp = require("gulp");
const concat = require("gulp-concat");
const minimize = require("gulp-uglify");
const watching = require("gulp-watch");
const minicss = require("gulp-clean-css");
const miniimg = require("gulp-imagemin");
const sass = require("gulp-sass");
const scmap = require ("gulp-sourcemaps")

gulp.task("default",["mnmjs","movehtml","movephp","movehppphp","moveclassphp","scss","imgmini","watcher"], function(){
    console.log("Default initialized!");
});

/*Flytta(kopiera) html filer till fin*/
gulp.task("movehtml", function(){
    gulp.src("work/*.html")
        .pipe(gulp.dest("fin/"))
        return console.log("flyttat HTML!");
});

/*Flytta(kopiera) main PHP filer till fin*/
gulp.task("movephp",function(){
    gulp.src("work/*.php")
        .pipe(gulp.dest("fin"))
        return console.log("Flyttat PHP")
});

/*Flytta(kopiera) hpp PHP filer till fin*/
gulp.task("movehppphp",function(){
    gulp.src("work/hpp/*.php")
        .pipe(gulp.dest("fin/hpp"))
        return console.log("Flyttat hpp PHP")
});

/*Flytta(kopiera) class PHP filer till fin*/
gulp.task("moveclassphp",function(){
    gulp.src("work/classes/*.php")
        .pipe(gulp.dest("fin/classes"))
        return console.log("Flyttat class PHP")
});

/*Sammanslagning oh minifiering av JS; merge n' minify javascripts(mnmjs)*/
gulp.task("mnmjs", function(){
    gulp.src("work/js/*.js")
        .pipe(concat("main.min.js"))
        //.pipe(minimize())
        .pipe(gulp.dest("fin/js"))
        return console.log("Merged, minimized and moved js!");
});

/*SCSS to CSS*/
gulp.task("scss", function(){
    gulp.src('work/css/**/*.scss')
    .pipe(scmap.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(scmap.write())
    .pipe(concat("styles.min.css"))
    .pipe(minicss())
    .pipe(gulp.dest('fin/css/'))
    return console.log("SCSS processed!");
});

/*Minimera bilder*/
gulp.task("imgmini", function(){
    gulp.src("work/bilder/*")
        .pipe(miniimg())
        .pipe(gulp.dest("fin/bilder"))
        return console.log("Minimized images");
});

/*Watcher, kollar och kopierar ändringar*/
gulp.task("watcher", function(){
    watching("work/js/*.js", function(){
        gulp.start("mnmjs");
    });

    watching("work/*.html", function(){
        gulp.start("movehtml");
    });

    watching("work/*.php", function(){
        gulp.start("movephp");
    });

    watching("work/hpp/*.php", function(){
        gulp.start("movehppphp");
    });

    watching("work/classes/*.php", function(){
        gulp.start("moveclassphp");
    });
    
    watching("work/css/*.scss",function(){
        gulp.start("scss");
    });

    watching("work/bilder/*", function(){
        gulp.start("imgmini");
    });
    console.log("Watching!");
});