const resumeDb = require("../model/resume");

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
  


