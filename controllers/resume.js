const resumeDb = require("../model/resume");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");


exports.userDetail= async (req, res, next)=>{
  try {
    const name=req.body.name;
    const email=req.body.email;
    const phone=req.body.phone;
    const resume=await new  resumeDb({ 
      user_details:{

        name:name,
        email:email,
        phone:phone
      }
    }).save();
    res.json({
      data:resume
    })
  } catch (error) {
    res.json({
      error:error.message
    })
  }

}

exports.education = async (req,res,next) =>{
  try {
    const userId = req.query.userId;
    const pg={ 
        percentage:req.body.pg.percentage,
        yearOfPassing:req.body.pg.yearOfPassing,
        institute:req.body.pg.institute
    };
    const ug={ 
      percentage:req.body.ug.percentage,
      yearOfPassing:req.body.ug.yearOfPassing,
      institute:req.body.ug.institute
  };
  const twelth={ 
    percentage:req.body.twelth.percentage,
    yearOfPassing:req.body.twelth.yearOfPassing,
    institute:req.body.twelth.institute
  };
  const tenth={ 
    percentage:req.body.tenth.percentage,
    yearOfPassing:req.body.tenth.yearOfPassing,
    institute:req.body.tenth.institute
  };
const resume= await resumeDb.findByIdAndUpdate(userId,{
  education :{
    pg:pg || "",
    ug:ug || "",
    twelth:twelth || "",
    tenth:tenth || ""
  }
  });
  const resume2= await resumeDb.findById(userId);
  res.json({
    message: "Resume",
    data:resume2
  })
} 
  catch (error) {
    res.json({
      error: error.message
    })
  }
};

exports.experience = async (req, res, next) => {
  try {
    const userId = req.query.userId;
    const experience= req.body.experience;
    const resume = await resumeDb.findByIdAndUpdate(userId,{
      experience:experience || ""
    })
    const resume2= await resumeDb.findById(userId)
    res.json({
      message:"Resume",
      data:resume2
    })
  } catch (error) {
    res.json({
      error:error.message
    })
    
  }
}

exports.projects = async (req, res, next) => {
  try {
    const userId = req.query.userId;
    const projects= req.body.projects;
    const resume = await resumeDb.findByIdAndUpdate(userId,{
      project:projects || ""
    })
    const resume2= await resumeDb.findById(userId)
    res.json({
      message:"Resume",
      data:resume2
    })
  } catch (error) {
    res.json({
      error:error.message
    })
    
  }
}

exports.portfolio = async (req, res, next) => {
  try {
    const userId = req.query.userId;
    const portfolio= req.body.portfolio;
    const resume = await resumeDb.findByIdAndUpdate(userId,{
      portfolio:portfolio || ""
    })
    const resume2= await resumeDb.findById(userId)
    res.json({
      message:"Resume",
      data:resume2
    })
  } catch (error) {
    res.json({
      error:error.message
    })
    
  }
}

exports.getUserById= async (req,res,next)=>{
  try {
    const userId=req.query.userId;
    const resume = await resumeDb.findById(userId);
    res.json({
      message:"Resume",
      data:resume
    })
  } catch (error) {
    res.json(({
      error:error.message
    }))
    
  }
}

exports.createPDF = async (req,res,next)=>{
  try {
    let userId = req.query.userId;
     console.log(userId);

   let resume = await resumeDb.findOne({ userId });
   if (!userId) {
     throw new Error("No resume found.");
    }
    let user_details = resume.user_details;
    let education = resume.education;
    let experience = resume.experience;
    let project = resume.project;
    let portfolio = resume.portfolio;

    const resumeName = "Resume-" + userId + ".pdf";
    const resumePath = path.join("data", "resume", resumeName);

      const pdfDoc = new PDFDocument();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'inline; filename="' + resumeName + '"'
      );
      pdfDoc.pipe(fs.createWriteStream(resumePath));
      pdfDoc.pipe(res);

      pdfDoc.fontSize(26).text("Resume", {
        underline: true,
      });
      pdfDoc.text("-----------------------");
      pdfDoc.fontSize(14).text("Name:" + user_details.name);
      pdfDoc.fontSize(14).text("email:" + user_details.email);
      pdfDoc.fontSize(14).text("phone:" + user_details.phone);
      pdfDoc.fontSize(14).text("Education:");
      pdfDoc.fontSize(14).text("Post Graducation:" + education.pg);
      pdfDoc.fontSize(14).text("Under Graducation:" + education.ug);
      pdfDoc.fontSize(14).text("Twelfth:" + education.twelth);
      pdfDoc.fontSize(14).text("Tenth:" + education.tenth);
      pdfDoc.fontSize(14).text("Experience:" + experience);
      pdfDoc.fontSize(14).text("Projects:" + project);
      pdfDoc.fontSize(14).text("Portfolio:" + portfolio);
      pdfDoc.end();
    } catch (error) {
      res.json({
        error:error.message
      })
    }
 }

  


