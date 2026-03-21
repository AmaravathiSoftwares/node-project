import { log } from "console";
import * as masterMdl from "../models/courtcasesMdl.js";
import fs from "fs";
import path from "path";

//departmant start

export async function inputFormCtrl(req, res) {}
export async function getCasesDataCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;

  masterMdl.getCasesDataMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function submitCourtCaseCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;
  console.log(data, "formData");
  masterMdl.submitCourtCaseMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    const caseId = cRes.insertId;
    const case_officers = {
      case_id: caseId,
      officers: data.officersStatus,
      entry_by: user.id,
    };

    masterMdl.SubmitOfficerstoCase(case_officers, function (err, cRes) {
      if (err) {
        res.send({ status: 500, msg: "Server Error" });
        return;
      }

      if (data.concernedSection) {
        const case_sections = {
          case_id: caseId,
          sections: data.concernedSection,
          entry_by: user.id,
        };
        masterMdl.SubmitSectionstoCase(case_sections, function (err, cRes) {
          if (err) {
            res.send({ status: 500, msg: "Server Error" });
            return;
          }
        });
      }
      const case_respondents = {
        case_id: caseId,
        officers: data.respondent,
        entry_by: user.id,
      };
      if (data.respondent) {
        masterMdl.SubmitRespodents(case_respondents, function (err, cRes) {
          if (err) {
            res.send({ status: 500, msg: "Server Error" });
            return;
          }
        });
      }

      res.send({ status: 200, data: "Case Added Successfully" });
    });
  });
}

export async function getcaseTypeCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;

  masterMdl.getcaseTypeMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function updateCaseDetailsCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;
  console.log(data, 80);

  masterMdl.updateCaseDetailsMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    console.log(data, 9);

    const sectionsData = {
      case_id: data.case_id,
      sections: data.caseDetails.concernedSection,
      entry_by: user.id,
    };
    masterMdl.updateSectionsMdl(sectionsData, function (err, sRes) {
      if (err) {
        res.send({ status: 500, msg: "Server Error" });
        return;
      }
    });
    const officersData = {
      case_id: data.case_id,
      officers: data.caseDetails.officersStatus,
      entry_by: user.id,
    };
    masterMdl.updateOfficerMdl(officersData, function (err, oRes) {
      if (err) {
        res.send({ status: 500, msg: "Server Error" });
        return;
      }
    });

    const respondentsData = {
      case_id: data.case_id,
      officers: data.caseDetails.respondent,
      entry_by: user.id,
    };
    masterMdl.updateRespondentMdl(respondentsData, function (err, oRes) {
      if (err) {
        res.send({ status: 500, msg: "Server Error" });
        return;
      }
    });
    res.send({ status: 200, data: cRes });
  });
}

export async function deleteCaseCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;

  masterMdl.deleteCaseMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function postHearingDataCtrl(req, res) {
  const data = req.body;
  const user = req.user;
  data.entry_by = user.id;

  try {
    const base64Data = data.form.image.reviewimg.split(",")[1];
    const fileType = data.form.image.imgtype || "jpg";

    const imagedata = {
      ...data,
      document: storeBase64Image({
        base64Data,
        fileNamePrefix: "hearing_",
        fileType,
      }),
    };

    console.log(imagedata, 19);

    masterMdl.postHearingDataMdl(imagedata, function (err, cRes) {
      if (err) {
        res.send({ status: 500, msg: "Server Error" });
        return;
      }
      res.send({ status: 200, data: cRes });
    });
  } catch (error) {
    console.error("Error processing hearing data:", error);
    res.send({ status: 500, msg: "Failed to process image" });
  }
}

function storeBase64Image({
  base64Data,
  fileNamePrefix = "img_",
  fileType = "png",
}) {
  try {
    const unqNum = Math.floor(1000 + Math.random() * 9000);

    const fileName = `${fileNamePrefix}${unqNum}.${fileType}`;

    const imagePath = path.join("/mnt/uploads/cases_images/", fileName);

    fs.writeFileSync(imagePath, base64Data, "base64");

    const imgUrl = `https://endowmentsinfo.ap.gov.in/uploads/cases_images/${fileName}`;
    console.log(`Image saved: ${imgUrl}`);
    return imgUrl;
  } catch (err) {
    console.error("Error storing image:", err);
    return null;
  }
}

export async function getanalysisDataCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;

  masterMdl.getanalysisDataMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function sectionDataCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;

  masterMdl.sectionDataMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function categoryDataCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;

  masterMdl.categoryDataMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function ofcDataCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;

  masterMdl.ofcDataMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function madalsDataCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;

  masterMdl.madalsDataCtrl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function villagesDataCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;

  masterMdl.villagesDataMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function templesDataCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;

  masterMdl.templesDataMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}
export async function uploadDocumentsCtrl(req, res) {
  const data = req.body;
  const user = req.user;
  data.entry_by = user.id;
  console.log(req.body, 297);

  try {
    const base64Data = data.files[0].reviewimg.split(",")[1];
    const fileType = data.files[0].imgtype || "jpg";

    const imagedata = {
      ...data,
      document: storeBase64Image({
        base64Data,
        // fileNamePrefix: 'hearing_',
        fileNamePrefix: req.body.subject_name,
        fileType,
      }),
    };

    console.log(imagedata, 19);

    masterMdl.uploadDocumentsMdl(imagedata, function (err, cRes) {
      if (err) {
        res.send({ status: 500, msg: "Server Error" });
        return;
      }
      res.send({ status: 200, data: cRes });
    });
  } catch (error) {
    console.error("Error processing hearing data:", error);
    res.send({ status: 500, msg: "Failed to process image" });
  }
}

export async function getUploadedDocumentsCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;

  masterMdl.getUploadedDocumentsMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}
export async function uniqueCaseNumberCheckCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;

  masterMdl.uniqueCaseNumberCheckMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

// Respondent Wise Report

export async function getRespondentDataCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;

  masterMdl.getRespondentDataMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getRespondentCourtCasesDataCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;

  masterMdl.getRespondentCourtCasesDataMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getCaseTypesCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;

  masterMdl.getCaseTypesMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}
//
// CATEGORY WISE REPORT
export async function getDistrictCourtCasesDataCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;

  masterMdl.getDistrictCourtCasesDataMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}
export async function getCategoryCourtCasesDataCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;

  masterMdl.getCategoryCourtCasesDataMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

// SECTIOn WISe REPORt

export async function getSectionCourtCasesDataCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;

  masterMdl.getSectionCourtCasesDataMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getOfficerCourtCasesDataCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;

  masterMdl.getOfficerCourtCasesDataMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

// ADD RESPONDENTS
export async function addRespondentCtrl(req, res) {
  const data = req.body;

  masterMdl.duplicateCheckMdl(data, function (err, cRes) {
    console.log(cRes[0].count, 541);

    if (cRes[0].count > 0) {
      res.send({ status: 409, msg: "Respondent Name Already Exist's" });
      return;
    } else {
      masterMdl.addRespondentMdl(data, function (err, cRes) {
        if (err) {
          res.send({ status: 500, msg: "Server Error" });
          return;
        }
        res.send({ status: 200, data: cRes });
      });
    }
  });
}

export async function getsectionabsrtractCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;

  masterMdl.getsectionabsrtractMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}
