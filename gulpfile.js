var gulp = require("gulp");
		sass = require("gulp-ruby-sass")
		size = require("gulp-size");
		rename = require("gulp-rename");
		minify = require("gulp-minify-css");
		browserSync = require("browser-sync");
		prefix = require("gulp-autoprefixer");
		reload = browserSync.reload;

var csspaths = {
	src: "./sass/app.sass",
	dest: "./css/"
}

gulp.task("bs", function(){
	browserSync({
		server: {
			baseDir: "./"
		}
	})
});

gulp.task("bs-reload", function(){
	browserSync.reload();
})

gulp.task("sass", function(){
	sass(csspaths.src, {style: "expanded"})
		.on("error", function(error){console.log(error.message)})
		.pipe(prefix())
		.pipe(gulp.dest(csspaths.dest))
		.pipe(size({showFiles: true}))
		.pipe(reload({stream: true}));
})

gulp.task("css-production", function(){
	gulp.src(csspaths.dest + "app.css") //WARNING
		.pipe(minify())
		.pipe(rename({suffix: ".min"}))
		.pipe(gulp.dest(csspaths.dest))
		.pipe(size({showFiles: true, gzip: true, title: "Ready for production, don't forget to target the minify css in your link tag"}))
		.pipe(reload({stream: true}));
})

gulp.task("production", ["css-production"])

gulp.task("default", ["bs", "sass"], function(){
	gulp.watch("sass/**/*.sass", ["sass"]);
	gulp.watch("*.html", ["bs-reload"]);
})