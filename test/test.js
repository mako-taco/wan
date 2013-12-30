var request = require('supertest');
var fs = require('fs');

describe("[Express]", function () {
	var express = require('express');
	var wan = require('../express');
	var app = express();
	app.use(wan({
		route: '/wan', 
		location: 'test/fixtures'
	}));
	app.use(express.static('test/fixtures'));

	describe("GET", function () {
		describe("with a path matching wan's", function () {
			describe("and no query string", function () {
				it("should respond with a 400", function (done) {
					request(app.listen())
					.get('/wan')
					.expect(400)
					.expect("No images to load", done);
				})
			})

			describe("with a query string", function () {
				describe("containing all valid file paths", function () {
					it("should stream back data URIs for each file", function (done) {
						request(app.listen())
						.get('/wan?0=icon0.png&1=icon1.png')
						.expect(200)
						.expect(fs.readFileSync('test/fixtures/good', {encoding: 'utf8'}), done);
					})
				})

				describe("containing a bad file path", function () {
					it("should stream back data URIs for each file, excluding the bad file", function (done) {
						request(app.listen())
						.get('/wan?0=icon0.png&1=iconBAD.png&2=icon1.png')
						.expect(200)
						.expect(fs.readFileSync('test/fixtures/bad', {encoding: 'utf8'}), done);
					})
				})
			})
		})

		describe("with a path not matching wan's", function () {
			it("should respond normally", function (done) {
				request(app.listen())
				.get('/test.html')
				.expect(200)
				.expect("Hello", done);
			})
		})
	})

	describe("POST", function () {
		describe("with a path matching wan's", function () {
			describe("and no query string", function () {
				it("should respond with a 400", function (done) {
					request(app.listen())
					.post('/wan')
					.expect(400)
					.expect("No images to load", done);
				})
			})

			describe("with a query string", function () {
				describe("containing all valid file paths", function () {
					it("should stream back data URIs for each file", function (done) {
						request(app.listen())
						.post('/wan')
						.send('icon0.png&icon1.png')
						.expect(200)
						.expect(fs.readFileSync('test/fixtures/good', {encoding: 'utf8'}), done);
					})
				})

				describe("containing a bad file path", function () {
					it("should stream back data URIs for each file, excluding the bad file", function (done) {
						request(app.listen())
						.post('/wan')
						.send('icon0.png&iconBAD.png&icon1.png')
						.expect(200)
						.expect(fs.readFileSync('test/fixtures/bad', {encoding: 'utf8'}), done);
					})
				})
			})
		})
	})
});

describe("[Koa]", function () {
	var koa = require('koa');
	var wan = require('../koa');
	var serve = require('koa-static');
	
	var app = koa();
	app.use(wan({
		route: '/wan', 
		location: 'test/fixtures'
	}));
	app.use(serve('test/fixtures', {maxage: 10000}));
	
	describe("GET", function () {
		describe("with a path matching wan's", function () {
			describe("and no query string", function () {
				it("should respond with a 400", function (done) {
					request(app.listen())
					.get('/wan')
					.expect(400)
					.expect("No images to load", done);
				})
			})

			describe("with a query string", function () {
				describe("containing all valid file paths", function () {
					it("should stream back data URIs for each file", function (done) {
						request(app.listen())
						.get('/wan?0=icon0.png&1=icon1.png')
						.expect(200)
						.expect(fs.readFileSync('test/fixtures/good', {encoding: 'utf8'}), done);
					})
				})

				describe("containing a bad file path", function () {
					it("should stream back data URIs for each file, excluding the bad file", function (done) {
						request(app.listen())
						.get('/wan?0=icon0.png&1=iconBAD.png&2=icon1.png')
						.expect(200)
						.expect(fs.readFileSync('test/fixtures/bad', {encoding: 'utf8'}), done);
					})
				})
			})
		})

		describe("with a path not matching wan's", function () {
			it("should respond normally", function (done) {
				request(app.listen())
				.get('/test.html')
				.expect(200)
				.expect("Hello", done);
			})
		})
	})

	describe("POST", function () {
		describe("with a path matching wan's", function () {
			describe("and no query string", function () {
				it("should respond with a 400", function (done) {
					request(app.listen())
					.post('/wan')
					.expect(400)
					.expect("No images to load", done);
				})
			})

			describe("with a query string", function () {
				describe("containing all valid file paths", function () {
					it("should stream back data URIs for each file", function (done) {
						request(app.listen())
						.post('/wan')
						.send('icon0.png&icon1.png')
						.expect(200)
						.expect(fs.readFileSync('test/fixtures/good', {encoding: 'utf8'}), done);
					})
				})

				describe("containing a bad file path", function () {
					it("should stream back data URIs for each file, excluding the bad file", function (done) {
						request(app.listen())
						.post('/wan')
						.send('icon0.png&iconBAD.png&icon1.png')
						.expect(200)
						.expect(fs.readFileSync('test/fixtures/bad', {encoding: 'utf8'}), done);
					})
				})
			})
		})
	})
});