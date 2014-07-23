#!/usr/bin/env python

import webapp2
import os
from google.appengine.ext.webapp import template
from google.appengine.ext import ndb
from webapp2_extras import json
import pprint

def items_to_json(items):
        result=[]
        for item in items:
            result.append({"id":item.key.id(),"state":item.state,"body":item.body})
        return result


class Item(ndb.Model):
    body = ndb.StringProperty()
    state = ndb.BooleanProperty()


class MainHandler(webapp2.RequestHandler):
    def get(self):
    	path = os.path.join(os.path.dirname(__file__), 'index.html')
    	self.response.out.write(template.render(path,{}))


class CreateHandler(webapp2.RequestHandler):
	def post(self):
		item = Item()
		item.body = self.request.get('body')
		item.state = False
		item_key = item.put()
		itemJSON = {'id': item_key.get().key.id(),"state":item.state,"body":item.body}
		self.response.headers['Content-Type'] = 'application/json'
		self.response.out.write(json.encode(itemJSON))


class DeleteHandler(webapp2.RequestHandler):
	def get(self):
		id = int(self.request.get('id'))
		item = Item.get_by_id(id)
		item.key.delete()


class UpdateHandler(webapp2.RequestHandler):
	def post(self):
         id = int(self.request.get('id'))
         item = Item.get_by_id(id)
         state = self.request.get('state')
         if 'false' == state:
             item.state = False
         else:
             item.state = True
         item.put()


class GetAllHandler(webapp2.RequestHandler):
    def get(self):
        items = Item.query().fetch()
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.encode(items_to_json(items)))

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/create', CreateHandler),
    ('/delete', DeleteHandler),
    ('/update', UpdateHandler),
    ('/getall', GetAllHandler),
], debug=True)