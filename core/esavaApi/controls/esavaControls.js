import * as masterMdl from "../models/esavaModel.js";
import fs from "fs";
import path from "path";
import pdf from "pdf-creator-node";
import { PDFDocument } from "pdf-lib";
import puppeteer from "puppeteer";
import {
  generateDarshnamPdfTicket,
  generateSevaPdfTicket,
  generateAccommodationPdfTicket,
  generatePrasadamPdfTicket,
  generateTonsurePdfTicket,
} from "../middleware/ticketPdfgenerator.js";

import { sendOtp } from "../../../utils/watiSmsUtil.js";
const otpStore = new Map();
//Accommodation
// export async function getTempleMasterCtrl(req, res) {
//     const data = req.body;
//     masterMdl.getTempleMasterMdl(data, function (err, cRes) {
//         if (err) {
//             res.send({ status: 500, "msg": "Server Error" });
//             return;
//         }
//         res.send({ status: 200, "data": cRes });
//     });
// }

export async function createeRoomMasterCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;
  data.temple_id = user.temple_id;
  data.district_id = user.district_id;

  if (data.room_image_url) {
    let image_url = data.room_image_url;
    let imgcnt = 0;
    let array = image_url.split(",");
    let datetimestamp = Date.now();
    let random_number = Math.floor(100000 + Math.random() * 900000);
    let unicnumber = random_number + "" + datetimestamp;
    let base64Data = array[1];
    const fileName = `${unicnumber}.jpg`;
    const imagePath = path.join("/mnt/uploads/whatsappservice/rooms/", fileName);

    fs.writeFileSync(imagePath, base64Data, "base64");
    // fs.writeFile("../public_html/task_images/new_task_image/" + unicnumber + '.jpg', base64Data, 'base64', function (err) {
    // });
    data.room_image_url = `https://endowmentsinfo.ap.gov.in/uploads/whatsappservice/rooms/${fileName}`;
  } else {
    data.room_image_url = "";
  }
  masterMdl.createeRoomMasterMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, msg: "created successfully" });
  });
}

export async function geteRoomMasterCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;
  data.temple_id = user.temple_id;
  masterMdl.geteRoomMasterMdl(data, user, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function updateeRoomMasterCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.updated_by = user.id;
  masterMdl.updateeRoomMasterMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, msg: "updated successfully" });
  });
}

export async function deleteeRoomMasterCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.d_by = user.id;
  masterMdl.deleteeRoomMasterMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, msg: "deleted successfully" });
  });
}

// prasadm

// export async function createePrasadamMasterCtrl(req, res) {
//     const data = req.body;
//     let user = req.user;
//     data.entry_by = user.id;
//     data.temple_id = user.temple_id;
//     data.district_id = user.district_id;

//     masterMdl.createePrasadamMasterMdl(data, function (err, cRes) {
//         if (err) {
//             res.send({ status: 500, "msg": "Server Error" });
//             return;
//         }
//         res.send({ status: 200, "msg": "created successfully" });
//     });
// }
export async function createePrasadamMasterCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;
  data.temple_id = user.temple_id;
  data.district_id = user.district_id;

  if (data.prasadam_image_url) {
    let image_url = data.prasadam_image_url;
    let imgcnt = 0;
    let array = image_url.split(",");
    let datetimestamp = Date.now();
    let random_number = Math.floor(100000 + Math.random() * 900000);
    let unicnumber = random_number + "" + datetimestamp;
    let base64Data = array[1];
    const fileName = `${unicnumber}.jpg`;
    const imagePath = path.join("/mnt/uploads/whatsappservice/prasadam/", fileName);
    // const imagePath = path.join("/mnt/uploadfiles/roomsimage", fileName);

    fs.writeFileSync(imagePath, base64Data, "base64");
    // fs.writeFile("../public_html/task_images/new_task_image/" + unicnumber + '.jpg', base64Data, 'base64', function (err) {
    // });
    data.prasadam_image_url = `https://endowmentsinfo.ap.gov.in/uploads/whatsappservice/prasadam/${fileName}`;
  } else {
    data.prasadam_image_url = "";
  }

  masterMdl.createePrasadamMasterMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, msg: "created successfully" });
  });
}

export async function getePrasadamMasterCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;
  data.temple_id = user.temple_id;
  masterMdl.getePrasadamMasterMdl(data, user, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

// export async function updateePrasadamMasterCtrl(req, res) {
//     const data = req.body;
//     let user = req.user;
//     data.updated_by = user.id;
//     data.temple_id = user.temple_id;
//     masterMdl.updateePrasadamMasterMdl(data, function (err, cRes) {
//         if (err) {
//             res.send({ status: 500, "msg": "Server Error" });
//             return;
//         }
//         res.send({ status: 200, "msg": "updated successfully" });
//     });
// }

export async function updateePrasadamMasterCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.updated_by = user.id;
  data.temple_id = user.temple_id;

  if (data.prasadam_image_url && data.prasadam_image_url.includes("base64")) {
    let image_url = data.prasadam_image_url;
    let array = image_url.split(",");
    let datetimestamp = Date.now();
    let random_number = Math.floor(100000 + Math.random() * 900000);
    let unicnumber = random_number + "" + datetimestamp;

    let base64Data = array[1];

    const fileName = `${unicnumber}.jpg`;
    const imagePath = path.join("/mnt/uploads/whatsappservice/prasadam/", fileName);
    // const imagePath = path.join("/public_html/uploadfiles/roomsimage", fileName);

    fs.writeFileSync(imagePath, base64Data, "base64");

    data.prasadam_image_url = `https://endowmentsinfo.ap.gov.in/uploads/whatsappservice/prasadam/${fileName}`;
  } else if (!data.prasadam_image_url) {
    data.prasadam_image_url = "";
  }
  masterMdl.updateePrasadamMasterMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, msg: "updated successfully" });
  });
}

export async function deleteePrasadamMasterCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.d_by = user.id;
  masterMdl.deleteePrasadamMasterMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, msg: "deleted successfully" });
  });
}

// tonsure
export async function createeTonsureMasterCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;
  data.temple_id = user.temple_id;
  data.district_id = user.district_id;
  masterMdl.createeTonsureMasterMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, msg: "created successfully" });
  });
}

export async function geteTonsureMasterCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;
  data.temple_id = user.temple_id;
  masterMdl.geteTonsureMasterMdl(data, user, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function updateeTonsureMasterCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.updated_by = user.id;
  data.temple_id = user.temple_id;
  masterMdl.updateeTonsureMasterMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, msg: "updated successfully" });
  });
}

export async function deleteeTonsureMasterCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.d_by = user.id;
  masterMdl.deleteeTonsureMasterMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, msg: "deleted successfully" });
  });
}

// darshnam

export async function getTempleMastersCtrl(req, res) {
  var data = req.body;
  let user = req.user;
  data.temples = user.temple_id;
  masterMdl.getTempleMastersMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getDarshnamDetailsCtrl(req, res) {
  var data = req.body;
  let user = req.user;
  data.entry_by = user.id;
  data.temple_id = user.temple_id;
  masterMdl.getDarshnamDetailsMdl(data, user, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function postDarshnamDetailsCtrl(req, res) {
  var data = req.body;
  var user = req.user;
  data.entry_by = user.id;
  data.temple_id = user.temple_id;
  data.district_id = user.district_id;
  masterMdl.getLastDarshnamDetailsMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    console.log(cRes, 588);

    const lastId = cRes[0]?.id || 0;
    const newId = lastId + 1;
    console.log(lastId, newId, 588);
    data.darshan_id = "D" + newId;
    console.log(data.darshan_id, 597);
    masterMdl.postDarshnamDetailsMdl(data, function (err, rRes) {
      if (err) {
        res.send({ status: 500, msg: "Server Error" });
        return;
      }
      res.send({ status: 200, data: rRes });
    });
  });
}

export async function editDarshnamDetailsCtrl(req, res) {
  var data = req.body;
  var user = req.user;
  data.updated_by = user.id;
  masterMdl.editDarshnamDetailsMdl(data, function (err, rRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: rRes });
  });
}

export async function deleteDarshnamDetailsCtrl(req, res) {
  var data = req.body;
  let user = req.user;
  data.d_by = user.id;
  masterMdl.deleteDarshnamDetailsMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function submitSevaMastersDetailsCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;
  data.temple_id = user.temple_id;
  data.district_id = user.district_id;

  masterMdl.getSevaDetailsMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    console.log(cRes, 588);

    const lastId = cRes[0]?.id || 0;
    const newId = lastId + 1;
    console.log(lastId, newId, 588);
    data.seva_id = "S" + newId;
    console.log(data.seva_id, 597);
    console.log(data, "formData");

    masterMdl.submitSevaMastersDetailsMdl(data, function (err, cRes) {
      if (err) {
        res.send({ status: 500, msg: "Server Error" });
        return;
      }
      res.send({ status: 200, data: cRes });
    });
  });
}

export async function getsevaMastersdataCtrl(req, res) {
  let data = req.body;
  let user = req.user;
  data.entry_by = user.id;
  data.temple_id = user.temple_id;
  masterMdl.getsevaMastersdataMdl(data, user, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function editSevaMastersDetailsCtrl(req, res) {
  var data = req.body;
  var user = req.user;
  console.log(user, 144);
  data.updated_by = user.id;
  masterMdl.editSevaMastersDetailsMdl(data, function (err, rRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: rRes });
  });
}

export async function deleteSevaMastersDetailsCtrl(req, res) {
  var data = req.body;
  let user = req.user;
  data.d_by = user.id;
  masterMdl.deleteSevaMastersDetailsMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function inactiveDarshanMastersDetailsCtrl(req, res) {
  var data = req.body;
  let user = req.user;
  data.updated_by = user.id;
  masterMdl.inactiveDarshanMastersDetailsMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function inactiveSevaMastersDetailsCtrl(req, res) {
  var data = req.body;
  let user = req.user;
  data.updated_by = user.id;
  masterMdl.inactiveSevaMastersDetailsMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getRoomDetailsCtrl(req, res) {
  var data = req.body;
  masterMdl.getRoomDetailsMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getTheSlotDetailsCtrl(req, res) {
  var data = req.body;
  masterMdl.getTheSlotDetailsMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

//RGTs Apis
export async function getDistrictsCtrl(req, res) {
  try {
    const data = req.body;
    masterMdl.getDistrictsMdl(data, function (err, result) {
      if (err) {
        return res.status(500).json({ status: false, code: "SERVER_ERROR", message: "Internal server error" });
      }
      return res.status(200).json({ status: true, code: "SUCCESS", data: result });
    });
  } catch (error) {
    return res.status(500).json({ status: false, code: "UNEXPECTED_ERROR", message: "Something went wrong" });
  }
}
// export async function getTemplesCtrl(req, res) {
//     try {
//         const data = req.body;
//         masterMdl.getTemplesMdl(data, function (err, result) {
//             if (err) {
//                 return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
//             }
//             return res.status(200).json({ status: true, code: 'SUCCESS', data: result });
//         });
//     } catch (error) {
//         return res.status(500).json({ status: false, code: 'UNEXPECTED_ERROR', message: 'Something went wrong' });
//     }
// };
export async function getTemplesCtrl(req, res) {
  try {
    const data = req.body;

    masterMdl.getTemplesMdl(data, function (err, result) {
      if (err) {
        return res.status(500).json({ status: false, code: "SERVER_ERROR", message: "Internal server error" });
      }

      //    rooms/

      const IMAGE_DIR = path.join("/mnt/uploads/whatsappservice/templeprofiles");
      const formattedResult = result.map((item) => {
        let base64Image = null;

        if (item.temple_logo) {
          const fileName = item.temple_logo.split("/").pop();
          const imagePath = path.join(IMAGE_DIR, fileName);
          base64Image = imageToBase64(imagePath);
        }

        return {
          ...item,
          temple_logo_base64: base64Image,
        };
      });

      return res.status(200).json({ status: true, code: "SUCCESS", data: formattedResult });
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      code: "UNEXPECTED_ERROR",
      message: "Something went wrong",
    });
  }
}

export async function getServicesListCtrl(req, res) {
  try {
    const data = req.body;
    masterMdl.getServicesListMdl(data, function (err, result) {
      if (err) {
        return res.status(500).json({ status: false, code: "SERVER_ERROR", message: "Internal server error" });
      }
      return res.status(200).json({ status: true, code: "SUCCESS", data: result });
    });
  } catch (error) {
    return res.status(500).json({ status: false, code: "UNEXPECTED_ERROR", message: "Something went wrong" });
  }
}

// Darshnam start
export async function getDarshnamServiceCtrl(req, res) {
  try {
    const data = req.body;
    masterMdl.getDarshnamServiceMdl(data, function (err, result) {
      if (err) {
        return res.status(500).json({ status: false, code: "SERVER_ERROR", message: "Internal server error" });
      }
      return res.status(200).json({ status: true, code: "SUCCESS", data: result });
    });
  } catch (error) {
    return res.status(500).json({ status: false, code: "UNEXPECTED_ERROR", message: "Something went wrong" });
  }
}
export async function getDarshanSlotsCtrl(req, res) {
  try {
    const data = req.body;
    masterMdl.getDarshanSlotsMdl(data, function (err, result) {
      if (err) {
        return res.status(500).json({ status: false, code: "SERVER_ERROR", message: "Internal server error" });
      }
      return res.status(200).json({ status: true, code: "SUCCESS", data: result });
    });
  } catch (error) {
    return res.status(500).json({ status: false, code: "UNEXPECTED_ERROR", message: "Something went wrong" });
  }
}
export async function createeDarshnamOrdersCtrl(req, res) {
  try {
    const data = req.body;
    masterMdl.getTicketRefMdl(function (err, tckitresults) {
      if (err) {
        return res.status(500).send({ status: 500, msg: "Server Error" });
      }
      console.log(tckitresults, "tckitresults");
      let ticket_id = 0;
      if (tckitresults.length) {
        ticket_id = tckitresults[0].ticket_id;
      }
      const recidi = ticket_id * 1 + 1;
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      const dateStr = `${yyyy}${mm}${dd}`;
      const recid = `${dateStr}${recidi}`;
      data.ticket_id = recid;
      let total_amount = 0;
      total_amount = data.amount * 1 + data.handling_charge * 1;
      data.total_amount = total_amount;
      masterMdl.createeDarshnamOrdersMdl(data, async function (err, result) {
        if (err) {
          return res.status(500).json({ status: false, code: "SERVER_ERROR", message: "Internal server error" });
        }
        try {
          // WAIT until PDF is generated
          const darshnam_ticket = await generateDarshnamPdfTicket(data.reqId);
          return res.status(200).json({
            status: true,
            code: "SUCCESS",
            message: "Darshan order created successfully",
            darshnam_ticket,
          });
        } catch (pdfErr) {
          console.error("PDF generation failed:", pdfErr);
          return res.status(500).json({
            status: false,
            code: "PDF_ERROR",
            message: "Order created but ticket generation failed",
          });
        }
      });
    });
  } catch (error) {
    return res.status(500).json({ status: false, code: "UNEXPECTED_ERROR", message: "Something went wrong" });
  }
}

//Darshanm End

export async function getCheckboxesDataCtrl(req, res) {
  let data = req.body;
  let user = req.user;
  data.entry_by = user.id;
  masterMdl.getCheckboxesDataMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function updatetempleProfiledataCtrl(req, res) {
  const data = req.body;
  console.log(data, 168);

  let user = req.user;
  data.updated_by = user.id;
  console.log(data.templePhoto, "rtt");
  if (data.templePhoto) {
    let image_url = data.templePhoto;
    let imgcnt = 0;
    let array = image_url.split(",");
    let datetimestamp = Date.now();
    let random_number = Math.floor(100000 + Math.random() * 900000);
    let unicnumber = random_number + "" + datetimestamp;
    let base64Data = array[1];
    const fileName = `${unicnumber}.jpg`;
    const imagePath = path.join("/mnt/uploads/whatsappservice/templeprofiles/", fileName);

    fs.writeFileSync(imagePath, base64Data, "base64");
    // fs.writeFile("../public_html/task_images/new_task_image/" + unicnumber + '.jpg', base64Data, 'base64', function (err) {
    // });
    data.templePhoto = `https://endowmentsinfo.ap.gov.in/uploads/whatsappservice/templeprofiles/${fileName}`;
  } else {
    data.templePhoto = "";
  }

  masterMdl.updatetempleProfiledataMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }

    // if (data.facilities && data.facilities.length > 0) {
    //     const templeServicesData = {
    //         templeId: data.rowId,
    //         facilitiesArr: data.facilities // just the array of IDs
    //     };

    //     masterMdl.inserttempleServicesIdMdl(data.rowId, data.facilities, function (err2, insertRes) {
    //         if (err2) {
    //             res.send({ status: 500, msg: "Service Insert Error" });
    //             return;
    //         }
    //         res.send({ status: 200, msg: "Updated successfully and services inserted" });
    //     });
    // } else {
    //     res.send({ status: 200, msg: "Updated successfully, no services selected" });
    // }
    const facilitiesArr = Array.isArray(data.facilities) ? data.facilities : [];

    masterMdl.inserttempleServicesIdMdl(data.rowId, facilitiesArr, function (err2) {
      if (err2) {
        res.send({ status: 500, msg: "Service Insert Error" });
        return;
      }
      res.send({
        status: 200,
        msg: "Updated successfully",
      });
    });
  });
}

export async function inactivePrasadamMastersDetailsCtrl(req, res) {
  var data = req.body;
  let user = req.user;
  data.updated_by = user.id;
  masterMdl.inactivePrasadamMastersDetailsMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function inactiveTonsureMastersDetailsCtrl(req, res) {
  var data = req.body;
  let user = req.user;
  data.updated_by = user.id;
  masterMdl.inactiveTonsureMastersDetailsMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function inactiveAccomodationMastersDetailsCtrl(req, res) {
  var data = req.body;
  let user = req.user;
  data.updated_by = user.id;
  masterMdl.inactiveAccomodationMastersDetailsMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

// (async () => {
//     const browser = await puppeteer.launch({
//         args: ['--no-sandbox', '--disable-setuid-sandbox']
//     });

//     const page = await browser.newPage();
//     await page.goto('https://endowmentsinfo.ap.gov.in/phpfiles/index.php?getvalue=c9e10ea5-98fd-4ba1-b17a-34759559474c', { waitUntil: 'networkidle0' });

//     await page.pdf({
//        path: `/mnt/uploads/whatsappservice/dashnamtickets/${'darshan_ticket2'}.pdf`,
//         format: 'A4',
//         printBackground: true,
//         margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' }
//     });

//     await browser.close();
//     console.log('PDF generated successfully!');
// })
// ();

export async function updateSlotDetailsCtrl(req, res) {
  var data = req.body;
  let user = req.user;
  data.updated_by = user.id;
  masterMdl.updateSlotDetailsMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getalltemplesdataCtrl(req, res) {
  let data = req.body;
  let user = req.user;
  data.entry_by = user.id;
  data.temples = user.temple_id;
  masterMdl.getalltemplesdataMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

//Temple Profile

export async function editAllTempleProfileDetailsCtrl(req, res) {
  const data = req.body;
  console.log(data, 168);

  let user = req.user;
  data.updated_by = user.id;

  if (data.templePhoto) {
    let image_url = data.templePhoto;
    let imgcnt = 0;
    let array = image_url.split(",");
    let datetimestamp = Date.now();
    let random_number = Math.floor(100000 + Math.random() * 900000);
    let unicnumber = random_number + "" + datetimestamp;
    let base64Data = array[1];
    const fileName = `${unicnumber}.jpg`;
    const imagePath = path.join("/mnt/uploads/whatsappservice/templeprofiles/", fileName);

    fs.writeFileSync(imagePath, base64Data, "base64");
    // fs.writeFile("../public_html/task_images/new_task_image/" + unicnumber + '.jpg', base64Data, 'base64', function (err) {
    // });
    data.templePhoto = `https://endowmentsinfo.ap.gov.in/uploads/whatsappservice/templeprofiles/${fileName}`;
  } else {
    data.templePhoto = "";
  }

  masterMdl.editAllTempleProfileDetailsMdl(data, function (err) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, msg: "Updated successfully" });
  });
}

export async function deleteTempleProfileDetailsCtrl(req, res) {
  var data = req.body;
  let user = req.user;
  data.d_by = user.id;
  masterMdl.deleteTempleProfileDetailsMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function activeTempleProfileDetailsCtrl(req, res) {
  var data = req.body;
  let user = req.user;
  data.active_by = user.id;
  masterMdl.activeTempleProfileDetailsMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function activeSlotVisibilityCtrl(req, res) {
  var data = req.body;
  let user = req.user;
  data.updated_by = user.id;
  masterMdl.getTheSlotDetailsMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    // res.send({ "status": 200, "data": cRes });
    console.log(cRes, 585);
    if (cRes.length > 0) {
      masterMdl.activeSlotVisibilityMdl(data, function (err, rRes) {
        if (err) {
          res.send({ status: 500, msg: "Server Error" });
          return;
        }
        res.send({ status: 200, data: rRes });
      });
    } else {
      res.send({ status: 403, data: cRes });
    }
  });
}

export async function deleteSlotsSubCtrl(req, res) {
  var data = req.body;
  let user = req.user;
  data.d_by = user.id;
  masterMdl.deleteSlotsSubMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function insertSlotDetailsCtrl(req, res) {
  var data = req.body;
  let user = req.user;
  data.entry_by = user.id;
  data.temple_id = user.temple_id;
  masterMdl.insertSlotDetailsMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

//mana mitra apis start
export async function getTonsureMainCtrl(req, res) {
  try {
    const data = req.body;
    masterMdl.getTonsureMainMdl(data, function (err, result) {
      if (err) {
        return res.status(500).json({ status: false, code: "SERVER_ERROR", message: "Internal server error" });
      }
      return res.status(200).json({ status: true, code: "SUCCESS", data: result });
    });
  } catch (error) {
    return res.status(500).json({ status: false, code: "UNEXPECTED_ERROR", message: "Something went wrong" });
  }
}

export async function getPrasadameMainCtrl(req, res) {
  try {
    const data = req.body;
    masterMdl.getPrasadameMainMdl(data, function (err, result) {
      if (err) {
        return res.status(500).json({ status: false, code: "SERVER_ERROR", message: "Internal server error" });
      }
      return res.status(200).json({ status: true, code: "SUCCESS", data: result });
    });
  } catch (error) {
    return res.status(500).json({ status: false, code: "UNEXPECTED_ERROR", message: "Something went wrong" });
  }
}

export async function getSevaTypesCtrl(req, res) {
  try {
    const data = req.body;
    masterMdl.getSevaTypesMdl(function (err, result) {
      if (err) {
        return res.status(500).json({ status: false, code: "SERVER_ERROR", message: "Internal server error" });
      }
      return res.status(200).json({ status: true, code: "SUCCESS", data: result });
    });
  } catch (error) {
    return res.status(500).json({ status: false, code: "UNEXPECTED_ERROR", message: "Something went wrong" });
  }
}

export async function getSevaMainCtrl(req, res) {
  try {
    const data = req.body;
    masterMdl.getSevaMainMdl(data, function (err, result) {
      if (err) {
        return res.status(500).json({ status: false, code: "SERVER_ERROR", message: "Internal server error" });
      }
      return res.status(200).json({ status: true, code: "SUCCESS", data: result });
    });
  } catch (error) {
    return res.status(500).json({ status: false, code: "UNEXPECTED_ERROR", message: "Something went wrong" });
  }
}

export async function getAccommodationMainCtrl(req, res) {
  try {
    const data = req.body;
    masterMdl.getAccommodationMainMdl(data, function (err, result) {
      if (err) {
        return res.status(500).json({ status: false, code: "SERVER_ERROR", message: "Internal server error" });
      }
      return res.status(200).json({ status: true, code: "SUCCESS", data: result });
    });
  } catch (error) {
    return res.status(500).json({ status: false, code: "UNEXPECTED_ERROR", message: "Something went wrong" });
  }
}

export async function getSevaSlotsMainCtrl(req, res) {
  try {
    const data = req.body;
    masterMdl.getSevaSlotsMainMdl(data, function (err, result) {
      if (err) {
        return res.status(500).json({ status: false, code: "SERVER_ERROR", message: "Internal server error" });
      }
      return res.status(200).json({ status: true, code: "SUCCESS", data: result });
    });
  } catch (error) {
    return res.status(500).json({ status: false, code: "UNEXPECTED_ERROR", message: "Something went wrong" });
  }
}

export async function getSevaAccommodationMainCtrl(req, res) {
  try {
    const data = req.body;
    masterMdl.getSevaAccommodationMainMdl(data, function (err, result) {
      if (err) {
        return res.status(500).json({ status: false, code: "SERVER_ERROR", message: "Internal server error" });
      }
      return res.status(200).json({ status: true, code: "SUCCESS", data: result });
    });
  } catch (error) {
    return res.status(500).json({ status: false, code: "UNEXPECTED_ERROR", message: "Something went wrong" });
  }
}

export async function createEhundiOrderCtrl(req, res) {
  try {
    const data = req.body;
    masterMdl.getEhundiTicketRefMdl(function (err, tckitresults) {
      if (err) {
        return res.status(500).send({ status: 500, msg: "Server Error" });
      }
      console.log(tckitresults, "tckitresults");
      let ticket_id = 0;
      if (tckitresults.length) {
        ticket_id = tckitresults[0].ticket_id;
      }
      const recidi = ticket_id * 1 + 1;
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      const dateStr = `${yyyy}${mm}${dd}`;
      const recid = `${dateStr}${recidi}`;
      data.ticket_id = recid;
      let total_amount = 0;
      total_amount = data.amount * 1 + data.handling_charge * 1;
      data.total_amount = total_amount;
      masterMdl.createEhundiOrderMdl(data, function (err, result) {
        if (err) {
          return res.status(500).json({ status: false, code: "SERVER_ERROR", message: "Internal server error" });
        }
        return res.status(200).json({ status: true, code: "SUCCESS", message: "Order created successfully" });
      });
    });
  } catch (error) {
    return res.status(500).json({ status: false, code: "UNEXPECTED_ERROR", message: "Something went wrong" });
  }
}

export async function createAccommodationOrderCtrl(req, res) {
  try {
    const data = req.body;
    masterMdl.getAccommodationTicketRefMdl(function (err, tckitresults) {
      if (err) {
        return res.status(500).send({ status: 500, msg: "Server Error" });
      }
      console.log(tckitresults, "tckitresults");
      let ticket_id = 0;
      if (tckitresults.length) {
        ticket_id = tckitresults[0].ticket_id;
      }
      const recidi = ticket_id * 1 + 1;
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      const dateStr = `${yyyy}${mm}${dd}`;
      const recid = `${dateStr}${recidi}`;
      data.ticket_id = recid;
      let total_amount = 0;
      total_amount = data.amount * 1 + data.handling_charge * 1;
      data.total_amount = total_amount;
      masterMdl.createAccommodationOrderMdl(data, async function (err, result) {
        if (err) {
          return res.status(500).json({ status: false, code: "SERVER_ERROR", message: "Internal server error" });
        }
        try {
          // WAIT until PDF is generated
          const accommodation_ticket = await generateAccommodationPdfTicket(data.reqId);
          return res.status(200).json({
            status: true,
            code: "SUCCESS",
            message: "Order created successfully",
            accommodation_ticket,
          });
        } catch (pdfErr) {
          console.error("PDF generation failed:", pdfErr);
          return res.status(500).json({
            status: false,
            code: "PDF_ERROR",
            message: "Order created but ticket generation failed",
          });
        }
        // return res.status(200).json({ status: true, code: 'SUCCESS', "message": "order created successfully" });
      });
    });
  } catch (error) {
    return res.status(500).json({ status: false, code: "UNEXPECTED_ERROR", message: "Something went wrong" });
  }
}

export async function createTonsureOrderCtrl(req, res) {
  try {
    const data = req.body;
    masterMdl.getTonsureTicketRefMdl(function (err, tckitresults) {
      if (err) {
        return res.status(500).send({ status: 500, msg: "Server Error" });
      }
      console.log(tckitresults, "tckitresults");
      let ticket_id = 0;
      if (tckitresults.length) {
        ticket_id = tckitresults[0].ticket_id;
      }
      const recidi = ticket_id * 1 + 1;
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      const dateStr = `${yyyy}${mm}${dd}`;
      const recid = `${dateStr}${recidi}`;
      data.ticket_id = recid;
      let total_amount = 0;
      total_amount = data.amount * 1 + data.handling_charge * 1;
      data.total_amount = total_amount;
      masterMdl.createTonsureOrderMdl(data, async function (err, result) {
        if (err) {
          return res.status(500).json({ status: false, code: "SERVER_ERROR", message: "Internal server error" });
        }
        try {
          // WAIT until PDF is generated
          const tonsure_ticket = await generateTonsurePdfTicket(data.reqId);
          return res.status(200).json({
            status: true,
            code: "SUCCESS",
            message: "Order created successfully",
            tonsure_ticket,
          });
        } catch (pdfErr) {
          console.error("PDF generation failed:", pdfErr);
          return res.status(500).json({
            status: false,
            code: "PDF_ERROR",
            message: "Order created but ticket generation failed",
          });
        }
        // return res.status(200).json({ status: true, code: 'SUCCESS', "message": "Tonsure order created successfully" });
      });
    });
  } catch (error) {
    return res.status(500).json({ status: false, code: "UNEXPECTED_ERROR", message: "Something went wrong" });
  }
}

// export async function createPrasadamOrderCtrl(req, res) {
//     try {
//         const data = req.body;
//         masterMdl.getPrasadamTicketRefMdl(function (err, tckitresults) {
//             if (err) {
//                 return res.status(500).send({ status: 500, msg: "Server Error" });
//             }
//             console.log(tckitresults, 'tckitresults')
//             let ticket_id = 0;
//             if (tckitresults.length) {
//                 ticket_id = tckitresults[0].ticket_id;
//             }
//             const recidi = ((ticket_id * 1) + 1);
//             const today = new Date();
//             const yyyy = today.getFullYear();
//             const mm = String(today.getMonth() + 1).padStart(2, '0');
//             const dd = String(today.getDate()).padStart(2, '0');
//             const dateStr = `${yyyy}${mm}${dd}`;
//             const recid = `${dateStr}${recidi}`;
//             data.ticket_id = recid;
//             let total_amount = 0;
//             let gtot = 0;
//             gtot = (data.amount * 1 + data.qty * 1)
//             total_amount = (gtot * 1 + data.handling_charge * 1);
//             data.total_amount = total_amount;
//             data.gtot = gtot;
//             masterMdl.createPrasadamOrderMdl(data, function (err, result) {
//                 if (err) {
//                     return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
//                 }
//                 return res.status(200).json({ status: true, code: 'SUCCESS', "message": "Order created successfully" });
//             });
//         });
//     } catch (error) {
//         return res.status(500).json({ status: false, code: 'UNEXPECTED_ERROR', message: 'Something went wrong' });
//     }
// };

export async function createPrasadamOrderCtrl(req, res) {
  try {
    const data = req.body;
    data.entry_by = 10;
    let ordered_items = data.ordered_items;
    masterMdl.getPrasadamTicketRefMdl(async function (err, tckitresults) {
      if (err) {
        return res.status(500).send({ status: 500, msg: "Server Error" });
      }
      console.log(tckitresults, "tckitresults");
      let ticket_id = 0;
      if (tckitresults.length) {
        ticket_id = tckitresults[0].ticket_id;
      }
      const recidi = ticket_id * 1 + 1;
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      const dateStr = `${yyyy}${mm}${dd}`;
      const recid = `${dateStr}${recidi}`;
      data.ticket_id = recid;
      let total_amount = 0;
      total_amount = data.amount * 1 + data.handling_charge * 1;
      data.total_amount = total_amount;

      masterMdl.createPrasadamOrderMdl(data, function (err, result) {
        if (err) {
          return res.status(500).json({ status: false, code: "SERVER_ERROR", message: "Internal server error" });
        }
        masterMdl.prasadamOrderItemsMdl(
          ordered_items,
          data.booking_date,
          result.insertId,
          async function (err, result) {
            if (err) {
              return res.status(500).json({ status: false, code: "SERVER_ERROR", message: "Internal server error" });
            }
            try {
              // WAIT until PDF is generated
              const prasadam_ticket = await generatePrasadamPdfTicket(data.reqId);
              return res.status(200).json({
                status: true,
                code: "SUCCESS",
                message: "Order created successfully",
                prasadam_ticket,
              });
            } catch (pdfErr) {
              console.error("PDF generation failed:", pdfErr);
              return res.status(500).json({
                status: false,
                code: "PDF_ERROR",
                message: "Order created but ticket generation failed",
              });
            }
            // return res.status(200).json({ status: true, code: 'SUCCESS', "message": "Order created successfully" });
          },
        );
      });
    });
  } catch (error) {
    return res.status(500).json({ status: false, code: "UNEXPECTED_ERROR", message: "Something went wrong" });
  }
}

export async function createSevaOrderCtrl(req, res) {
  try {
    const data = req.body;
    masterMdl.getSevaTicketRefMdl(function (err, tckitresults) {
      if (err) {
        return res.status(500).send({ status: 500, msg: "Server Error" });
      }
      console.log(tckitresults, "tckitresults");
      let ticket_id = 0;
      if (tckitresults.length) {
        ticket_id = tckitresults[0].ticket_id;
      }
      const recidi = ticket_id * 1 + 1;
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      const dateStr = `${yyyy}${mm}${dd}`;
      const recid = `${dateStr}${recidi}`;
      data.ticket_id = recid;
      let total_amount = 0;
      total_amount = data.amount * 1 + data.handling_charge * 1;
      data.total_amount = total_amount;
      masterMdl.createSevaOrderMdl(data, async function (err, result) {
        if (err) {
          return res.status(500).json({ status: false, code: "SERVER_ERROR", message: "Internal server error" });
        }
        try {
          // WAIT until PDF is generated
          const seva_ticket = await generateSevaPdfTicket(data.reqId);
          return res.status(200).json({
            status: true,
            code: "SUCCESS",
            message: "Order created successfully",
            seva_ticket,
          });
        } catch (pdfErr) {
          console.error("PDF generation failed:", pdfErr);
          return res.status(500).json({
            status: false,
            code: "PDF_ERROR",
            message: "Order created but ticket generation failed",
          });
        }
        // return res.status(200).json({ status: true, code: 'SUCCESS', "message": "Order created successfully" });
      });
    });
  } catch (error) {
    return res.status(500).json({ status: false, code: "UNEXPECTED_ERROR", message: "Something went wrong" });
  }
}

export async function getTempleInfoCtrl(req, res) {
  try {
    const data = req.body;
    masterMdl.getTempleInfoMdl(data, function (err, result) {
      if (err) {
        return res.status(500).json({ status: false, code: "SERVER_ERROR", message: "Internal server error" });
      }
      const IMAGE_DIR = path.join("/mnt/uploads/whatsappservice/templeprofiles");
      const formattedResult = result.map((item) => {
        let base64Image = null;

        if (item.temple_logo) {
          const fileName = item.temple_logo.split("/").pop();
          const imagePath = path.join(IMAGE_DIR, fileName);
          base64Image = imageToBase64(imagePath);
        }

        return {
          ...item,
          temple_logo_base64: base64Image,
        };
      });

      return res.status(200).json({ status: true, code: "SUCCESS", data: formattedResult });
    });
  } catch (error) {
    return res.status(500).json({ status: false, code: "UNEXPECTED_ERROR", message: "Something went wrong" });
  }
}

function imageToBase64(filePath) {
  try {
    if (!filePath || !fs.existsSync(filePath)) {
      return null;
    }
    const buffer = fs.readFileSync(filePath);
    const ext = path.extname(filePath).replace(".", "");
    return `data:image/${ext};base64,${buffer.toString("base64")}`;
  } catch (err) {
    console.error("Base64 conversion error:", err);
    return null;
  }
}
//mana mitra apis end

export async function sendTempleMidOtpCtrl(req, res) {
  const data = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const obj = {
    phone_number: data.phone_number,
    otp: otp,
  };

  try {
    await sendOtp(obj);
    otpStore.set(data.phone_number, otp);
    console.log(obj, 387);
    return res.status(200).send({ status: 200, message: "OTP sent" });
  } catch (err) {
    console.error("Failed to send OTP:", err);
    return res.status(500).send({ status: 500, message: "Failed to send OTP" });
  }
}

export async function updateTempleMidsCtrl(req, res) {
  const data = req.body;
  const user = req.user;
  data.upd_by = user.id;
  const contactOtp = otpStore.get(data.phone_number);

  let isValidOtp = false;
  console.log(contactOtp);
  console.log(data, 1305);

  isValidOtp = data.otp == contactOtp;

  console.log(user);
  if (!isValidOtp) {
    return res.status(405).send({ status: 405, message: "Invalid OTP . Please try again." });
  }
  masterMdl.updateTempleMidsMdl(data, user, function (err, result) {
    if (err) {
      return res.status(500).json({ status: 500, message: "Internal server error" });
    }

    return res.status(200).json({ status: 200, data: result });
  });
}

export async function geteMastersUserModulesCtrl(req, res) {
  var data = req.body;
  masterMdl.geteMastersUserModulesMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export function eSevaAddUserCtrl(req, res) {
  const data = req.body;

  let user = req.user;
  data.entry_by = user.id;
  data.temple_id = user.temple_id;

  masterMdl.CheckmobilenumberMdl(data, function (err, results) {
    if (err) {
      return res.status(500).send({ status: 500, msg: "Server Error" });
    }
    if (results && results.length > 0) {
      return res.send({ status: 303, msg: "Mobile Number Already Exist" });
    }

    const usersdata = [data.name, null, data.number, data.designation, data.dept_id, data.role, data.temple_id, null];

    masterMdl.eSevaAddUserMdl(data, function (err2, results2) {
      if (err2) {
        return res.status(500).send({ status: 500, msg: err2 });
      }

      return res.send({ status: 200, data: results2 });
    });
  });
}

export async function activePrasadamcarryforwardDetailsCtrl(req, res) {
  var data = req.body;
  let user = req.user;
  data.updated_by = user.id;
  masterMdl.activePrasadamcarryforwardDetailsMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getDepartmentMastersCtrl(req, res) {
  const data = req.body;
  const user = req.user;
  data.role_type = req.user.role_type;
  data.entry_by = user.id;
  data.temple_id = user.temple_id;
  masterMdl.getDepartmentMastersMdl(data, function (err, cRes) {
    if (err) {
      return res.status(500).send({ status: 500, msg: "Server Error" });
    }

    return res.status(200).send({ status: 200, data: cRes });
  });
}

export async function submitDepartmentDetailsCtrl(req, res) {
  const data = req.body;
  const user = req.user;

  data.entry_by = user.id;
  data.temple_id = user.temple_id;
  masterMdl.submitDepartmentDetailsMdl(data, function (err, cRes) {
    if (err) {
      return res.status(500).send({ status: 500, msg: "Server Error" });
    }

    return res.status(200).send({ status: 200, data: cRes });
  });
}

export async function updateDepartmentDetailsCtrl(req, res) {
  const data = req.body;
  const user = req.user;

  data.upadted_by = user.id;
  data.temple_id = user.temple_id;
  masterMdl.updateDepartmentDetailsMdl(data, function (err, cRes) {
    if (err) {
      return res.status(500).send({ status: 500, msg: "Server Error" });
    }

    return res.status(200).send({ status: 200, data: cRes });
  });
}

export async function deleteDepartmentDetailsCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.d_by = user.id;
  masterMdl.deleteDepartmentDetailsMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getCounterMastersCtrl(req, res) {
  const data = req.body;
  const user = req.user;
  data.role_type = req.user.role_type;
  data.entry_by = user.id;
  data.temple_id = user.temple_id;
  masterMdl.getCounterMastersMdl(data, function (err, cRes) {
    if (err) {
      return res.status(500).send({ status: 500, msg: "Server Error" });
    }

    return res.status(200).send({ status: 200, data: cRes });
  });
}

export async function submitCounterDetailsCtrl(req, res) {
  const data = req.body;
  const user = req.user;

  data.entry_by = user.id;
  data.temple_id = user.temple_id;
  masterMdl.submitCounterDetailsMdl(data, function (err, cRes) {
    if (err) {
      return res.status(500).send({ status: 500, msg: "Server Error" });
    }

    return res.status(200).send({ status: 200, data: cRes });
  });
}

export async function updateCounterDetailsCtrl(req, res) {
  const data = req.body;
  const user = req.user;

  data.upadted_by = user.id;
  data.temple_id = user.temple_id;
  masterMdl.updateCounterDetailsMdl(data, function (err, cRes) {
    if (err) {
      return res.status(500).send({ status: 500, msg: "Server Error" });
    }

    return res.status(200).send({ status: 200, data: cRes });
  });
}

export async function deleteCounterDetailsCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.d_by = user.id;
  masterMdl.deleteCounterDetailsMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getShiftMastersCtrl(req, res) {
  const data = req.body;
  const user = req.user;
  data.role_type = req.user.role_type;
  data.entry_by = user.id;
  data.temple_id = user.temple_id;
  masterMdl.getShiftMastersMdl(data, function (err, cRes) {
    if (err) {
      return res.status(500).send({ status: 500, msg: "Server Error" });
    }

    return res.status(200).send({ status: 200, data: cRes });
  });
}

export async function submitShiftDetailsCtrl(req, res) {
  const data = req.body;
  const user = req.user;

  data.entry_by = user.id;
  data.temple_id = user.temple_id;
  masterMdl.submitShiftDetailsMdl(data, function (err, cRes) {
    if (err) {
      return res.status(500).send({ status: 500, msg: "Server Error" });
    }

    return res.status(200).send({ status: 200, data: cRes });
  });
}

export async function updateShiftDetailsCtrl(req, res) {
  const data = req.body;
  const user = req.user;

  data.upadted_by = user.id;
  data.temple_id = user.temple_id;
  masterMdl.updateShiftDetailsMdl(data, function (err, cRes) {
    if (err) {
      return res.status(500).send({ status: 500, msg: "Server Error" });
    }

    return res.status(200).send({ status: 200, data: cRes });
  });
}

export async function deleteShiftDetailsCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.d_by = user.id;
  masterMdl.deleteShiftDetailsMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getEsevaUserReportCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.temple_id = user.temple_id;
  masterMdl.getEsevaUserReportMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export function updateEsevaUserCtrl(req, res) {
  const data = req.body;

  let user = req.user;
  data.entry_by = user.id;
  data.temple_id = user.temple_id;

  const usersdata = [data.name, null, data.number, data.designation, data.dept_id, data.role, data.temple_id, null];

  masterMdl.updateEsevaUserMdl(data, function (err2, results2) {
    if (err2) {
      return res.status(500).send({ status: 500, msg: err2 });
    }

    return res.send({ status: 200, data: results2 });
  });
}

export async function deleteEsevaUserCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.d_by = user.id;
  masterMdl.deleteEsevaUserMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getCounterDetailsCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;
  data.temple_id = user.temple_id;
  masterMdl.getCounterDetailsMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getShiftDetailsCtrl(req, res) {
  const data = req.body;
  const user = req.user;

  data.entry_by = user.id;
  data.temple_id = user.temple_id;
  masterMdl.getShiftDetailsMdl(data, function (err, cRes) {
    if (err) {
      return res.status(500).send({ status: 500, msg: "Server Error" });
    }

    return res.status(200).send({ status: 200, data: cRes });
  });
}

export async function getAlertDetailsCtrl(req, res) {
  const data = req.body;
  const user = req.user;
  data.role_type = req.user.role_type;
  data.entry_by = user.id;
  data.temple_id = user.temple_id;
  masterMdl.getAlertDetailsMdl(data, function (err, cRes) {
    if (err) {
      return res.status(500).send({ status: 500, msg: "Server Error" });
    }
    return res.status(200).send({ status: 200, data: cRes });
  });
}

// -----------------------------------------------------eseva controlls------------------------------------------------------

export function addTemplewiseUsersCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;

  masterMdl.CheckmobilenumberMdl(data, function (err, results) {
    if (err) {
      return res.status(500).send({ status: 500, msg: "Server Error" });
    }
    if (results && results.length > 0) {
      return res.send({ status: 303, msg: "Mobile Number Already Exist" });
    }
    masterMdl.getRoleTenPermissionsMdl(data, function (err2, permissions) {
      if (err2) {
        return res.status(500).send({ status: 500, msg: err2 });
      }

      // Attach permissions to data
      data.rolePermissions = permissions;

      masterMdl.addTemplewiseUsersMdl(data, function (err3, results3) {
        if (err3) {
          return res.status(500).send({ status: 500, msg: err3 });
        }
        return res.send({ status: 200, data: results3 });
      });
    });
  });
}

export async function getTempleWiseUserUserReportCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.temple_id = user.temple_id;
  masterMdl.getTempleWiseUserUserReportMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export function updateTempleWiseUsersCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;
  masterMdl.updateTempleWiseUsersMdl(data, function (err2, results2) {
    if (err2) {
      return res.status(500).send({ status: 500, msg: err2 });
    }

    return res.send({ status: 200, data: results2 });
  });
}

export async function deleteTempleWiseUserCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.d_by = user.id;
  masterMdl.deleteTempleWiseUserMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function sendTwoOtpVerify(req, res) {
  const { phone_number1, phone_number2 } = req.body;

  if (!phone_number1 || !phone_number2) {
    return res.status(400).send({
      status: 400,
      message: "Both phone numbers are required",
    });
  }

  try {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Send SAME OTP to both numbers
    await sendOtp({ phone_number: phone_number1, otp });
    await sendOtp({ phone_number: phone_number2, otp });

    // Store OTP against both numbers
    otpStore.set(phone_number1, otp);
    otpStore.set(phone_number2, otp);

    console.log(`OTP sent to both numbers: ${otp}`);

    return res.status(200).send({
      status: 200,
      message: "OTP sent successfully to both numbers",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      status: 500,
      message: "Failed to send OTP",
    });
  }
}

export async function verifyTwoOtps(req, res) {
  const { otp, phone_number1, phone_number2 } = req.body;

  const otpStored1 = otpStore.get(phone_number1);
  const otpStored2 = otpStore.get(phone_number2);

  if (otp !== otpStored1 || otp !== otpStored2) {
    return res.status(400).send({
      status: 400,
      message: "Invalid OTP",
    });
  }

  // Remove OTP after success
  otpStore.delete(phone_number1);
  otpStore.delete(phone_number2);

  return res.status(200).send({
    status: 200,
    message: "OTP verified successfully",
  });
}

export async function updatetempleProfileWhatsappdataCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.updated_by = user.id;

  const facilitiesArr = Array.isArray(data.facilities) ? data.facilities : [];
  masterMdl.updatetempleProfileWhatsappdataMdl(data.rowId, facilitiesArr, function (err2) {
    if (err2) {
      res.send({ status: 500, msg: "Service Insert Error" });
      return;
    }
    res.send({
      status: 200,
      msg: "Updated successfully",
    });
  });
}

export async function getTempleMasterWhatsappCtrl(req, res) {
  var data = req.body;
  let user = req.user;
  data.temples = user.temple_id;
  masterMdl.getTempleMasterWhatsappMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}
