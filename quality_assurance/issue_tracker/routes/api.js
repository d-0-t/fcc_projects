'use strict';
var ObjectId = require('mongodb').ObjectID;
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProjectSchema = new Schema({
  name: { type: String, required: true},
  issues: [{   
    issue_title: { type: String, required: true },
    issue_text: { type: String, required: true },
    created_on: Date,
    updated_on: Date,
    created_by: { type: String, required: true },
    assigned_to: String,
    open: Boolean,
    status_text: String
    }]
});
const ProjectModel = mongoose.model("Project", ProjectSchema);


module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;

      let {
        _id,
        issue_title,
        issue_text,
        created_on,
        updated_on,
        created_by,
        assigned_to,
        open,
        status_text
      } = req.query;     

      if (open != undefined) {
        switch(open.toLowerCase()) {
          case "true": case "yes": case "1": open = true; break;
          case "false": case "no": case "0": open = false; break;
          default: open = true; break;
        }
        open = Boolean(open);
      } 
      
      
      ProjectModel.aggregate([
        { $match: { name: project } },
        { $unwind: "$issues" },
        _id ? { $match: {"issues._id": ObjectId(_id) } } : { $match: {} },
        issue_title ? { $match: {"issues.issue_title": issue_title} } : { $match: {} },
        issue_text ? { $match: {"issues.issue_text": issue_text} } : { $match: {} },
        created_on ? { $match: {"issues.created_on": created_on} } : { $match: {} },
        updated_on ? { $match: {"issues.updated_on": updated_on} } : { $match: {} },
        created_by ? { $match: {"issues.created_by": created_by} } : { $match: {} },
        assigned_to != undefined ? { $match: {"issues.assigned_to": assigned_to} } : { $match: {} },
        open != undefined ? { $match: {"issues.open": open} } : { $match: {} },
        status_text != undefined ? { $match: {"issues.status_text": status_text} } : { $match: {} }
      ]).exec((err,data) => {
        if (!data) {
          res.json({});
        } else {
          let filtered = data.map(item => item.issues);
          res.json(filtered);
        }
      });

    })
        .post(function (req, res){
      let project = req.params.project;
      
      let issue_title = req.body.issue_title;
      let issue_text = req.body.issue_text;
      let created_by = req.body.created_by;

      if (!issue_title || !issue_text || !created_by) {
        res.json({
          error: "required field(s) missing"
        });
      } else {

        let newIssue = {
          issue_title: issue_title,
          issue_text: issue_text,
          created_on: new Date(),
          updated_on: new Date(),
          created_by: created_by,
          assigned_to: req.body.assigned_to || "",
          open: true,
          status_text: req.body.status_text || ""
        };

        ProjectModel.findOne({name: project}, (err, data) => {
          if (!data) {
            let newProject = new ProjectModel({
              name: project,
              issues: [ newIssue ]
            });
            newProject.save((err, updata) => {
              if (err) { res.send("Error.") }
              else { res.json(updata.issues[0]) }
            });
          } else {
            data.issues.push(newIssue);
            data.save((err, updata) => {
              if (err) { res.send("Error.") }
              else { res.json(updata.issues[updata.issues.length-1]) }
            });
          }
        });
      }
    })
        
    .put(function (req, res){
      let project = req.params.project;

      let _id = req.body._id;
      let issue_title = req.body.issue_title;
      let issue_text = req.body.issue_text;
      let created_by = req.body.created_by;
      let assigned_to = req.body.assigned_to;
      let status_text = req.body.status_text;
      let open = req.body.open;
      
      if (!_id) {
        res.json({ error: 'missing _id' });
      } else {
        if (!issue_title && !issue_text && !created_by && !assigned_to && !status_text && open == undefined) {
          res.json({ error: 'no update field(s) sent', '_id': _id });
          return 0;
        }
        ProjectModel.findOne({name: project}, (err,data) => {
          if (err) {
            res.json({ error: 'could not update', '_id': _id });
          } else {
            let issueToMod = data.issues.id(_id);
            if (!issueToMod) {
              res.json({ error: 'could not update', '_id': _id });
            } else {
              issueToMod.issue_title = req.body.issue_title || issueToMod.issue_title;
              issueToMod.issue_text = req.body.issue_text || issueToMod.issue_text;
              issueToMod.created_by = req.body.created_by || issueToMod.created_by;
              issueToMod.assigned_to = req.body.assigned_to || issueToMod.assigned_to;
              issueToMod.status_text = req.body.status_text || issueToMod.status_text;
              issueToMod.open = req.body.open || issueToMod.open;
              issueToMod.updated_on = new Date();
              
              data.save((err, updata) => {
                if (err) { res.json({ error: 'could not update', '_id': _id });
                  console.log(err);
                }
                else { res.json({ result: 'successfully updated', '_id': _id }) };
              })
            }
          }
        });
      }
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      let id = req.body._id;

      if (!id) {
        res.json({ error: 'missing _id' })
      }
      else {
        ProjectModel.findOneAndUpdate({name: project}, { $pull: { issues: { _id: id } } },
          function(err,data) {
            if (err || !data) {
              res.json({ error: 'could not delete', '_id': id })
            } else {
              let checker = false;
              for (let i = 0; i < data.issues.length; i++) {
                if (id == data.issues[i]._id) {
                  checker = true;
                }
              }
            
              if (!checker) {
                res.json({ error: 'could not delete', '_id': id })
              } else {
                res.json({ result: 'successfully deleted', '_id': id })
              }
            }
        });
      }
    }); 
};
