const mongoose = require("mongoose");
const Article = require('../models/article');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

let article1 = Article.create({title: "Learn Testing", content: "Lorem Ipsum", published: true})

describe('Articles', () => {
  after(async () => {  
    await Article.deleteMany()
  })

  describe('POST /articles/create', () => {
    it('it should not create an article without a title', (done) => {
      let article = {
        content: "Blah blah",
        published: true
      }
      chai.request(server)
      .post('/articles/create')
      .send(article)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors[0].should.have.property('msg').eql('Title is required');
        done();
      });
    });
    
    it('it should create an article ', (done) => {
      let article = {
        title: "Learn Mocha",
        content: "Test this.",
        published: true
      }
      chai.request(server)
      .post('/articles/create')
      .send(article)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Article successfully created');
        res.body.article.should.have.property('title');
        res.body.article.should.have.property('content');
        res.body.article.should.have.property('published');
        done();
      });
    });
  });

  describe('GET /articles/:id', () => {
    it('it should GET article with given id', (done) => {
      let article = new Article({title: "Learn Chai", content: "Lorem Ipsum", published: true})
      article.save((err, article) => {       
        chai.request(server)
          .get('/articles/' + article._id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title').eql("Learn Chai");
            done();
          });
      });
    });
  });

  describe('GET /articles', () => {
    it('it should GET all the articles', (done) => {
      chai.request(server)
        .get('/articles')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(3);
          done();
        });
    });
  });

  describe('/PATCH /articles/:id/update', () => {
    it('it should update a article given an id', (done) => {
      let article = new Article({title: "Learn Testing", content: "Lorem Ipsum", published: true})
      article.save((err, article) => {
        chai.request(server)
          .patch('/articles/' + article._id + '/update')
          .send({title: "Learn TDD", content: "Blah blah."})
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Article updated');
            res.body.article.should.have.property('title').eql("Learn TDD");
            done();
          });
      });
    });
  });

  describe('DELETE /articles/:id/delete', () => {
    it('it should delete a article given an id', (done) => {
      let article = new Article({title: "Learn Unit Testing", content: "Lorem Ipsum", published: true})
      article.save((err, article) => {
        chai.request(server)
          .delete('/articles/' + article.id + '/delete')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Article deleted');
            done();
          });
      });
    });
  });
});
