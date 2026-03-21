import * as masterMdl from "../models/aianalyticsModel.js";
import fs from "fs";
import axios from "axios";

export async function qlinesdataCtrl(req, res) {
  var data = req.body;
  // console.log(data);

  masterMdl.qlinesdataMdl(data, function (err, results) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: results });
  });
}

export async function newQlineDayCountDetailsCtrl(req, res) {
  let data = req.body;
  masterMdl.newQlineDayCountDetailsMdl(data, function (err, results) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    console.log(results);

    res.send({ status: 200, data: results });
  });
}
export async function timewisedataCtrl(req, res) {
  var data = req.body;
  // console.log(data);

  masterMdl.timewisedataMdl(data, function (err, results) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: results });
  });
}

export async function qlinedaycountdetailsCtrl(req, res) {
  var data = req.body;

  masterMdl.qlinedaycountdetailsMdl(data, function (err, results) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }

    if (results.length == 0) {
      results.push(
        { qline_type: "Free", qline_people_count: "0" },
        { qline_type: "100", qline_people_count: "0" },
        { qline_type: "300", qline_people_count: "0" },
        { qline_type: "500", qline_people_count: "0" },
      );
    }
    var qiocns = [
      "https://durgamalleswaraswamy.com/uploadfiles/qline_images/freeqline.svg",
      "https://durgamalleswaraswamy.com/uploadfiles/qline_images/100qline.svg",
      "https://durgamalleswaraswamy.com/uploadfiles/qline_images/300qline.svg",
      "https://durgamalleswaraswamy.com/uploadfiles/qline_images/500qline.svg",
    ];
    var qicnt = 0;

    results.map((obj) => {
      obj.qlineicon = qiocns[qicnt];
      qicnt = (qicnt + 1) % qiocns.length; // Ensure qicnt wraps around if necessary
      return obj; // Return the modified object
    });
    res.send({ status: 200, data: results });
  });
}

export async function ttyw_qlinecountdetailsCtrl(req, res) {
  var data = req.body;
  // console.log(data);

  masterMdl.ttyw_qlinecountdetailsMdl(data, function (err, results) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: results });
  });
}

export async function getQlinewisehourlycountanalysisCtrl(req, res) {
  let data = req.body;
  masterMdl.getQlinewisehourlycountanalysisMdl(data, function (err, results) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: results });
  });
}
export async function getweekwiseqlineanalysisCtrl(req, res) {
  var data = req.body;
  // console.log(data);

  masterMdl.getweekwiseqlineanalysisMdl(data, function (err, results) {
    if (err) {
      console.log(err, 61);

      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: results });
  });
}

// anna
export async function getanndanamnewQlineCountsCtrl(req, res) {
  let data = req.body;
  masterMdl.getanndanamnewQlineCountsMdl(data, function (err, results) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: results });
  });
}

export async function annaprasadhamgetHourwiseqlineanalysisCtrl(req, res) {
  let data = req.body;
  masterMdl.annaprasadhamgetHourwiseqlineanalysisMdl(data, function (err, results) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: results });
  });
}
export async function annaprasadhamDaywiseqlineanalysisCtrl(req, res) {
  let data = req.body;
  masterMdl.annaprasadhamDaywiseqlineanalysisMdl(data, function (err, results) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: results });
  });
}

export async function annaprasadhamanalysisCtrl(req, res) {
  var data = req.body;
  // console.log(data);

  masterMdl.annaprasadhamanalysisMdl(data, function (err, results) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: results });
  });
}

export async function annaprasadhamtimeCtrl(req, res) {
  var data = req.body;
  // console.log(data);

  masterMdl.annaprasadhamtimeMdl(data, function (err, results) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: results });
  });
}

// parking

export async function getparkingdataCtrl(req, res) {
  var data = req.body;

  masterMdl.getparkingdataMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getparkingcardscountdataCtrl(req, res) {
  var data = req.body;

  masterMdl.getparkingcardscountdataMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
};

export function templesCamerasFeedDataCtrl(req, res) {
  let data = req.body;

  // console.log(data, 'Amvt');
  // res.send({ 'status': 200, 'data': data });
  masterMdl.templesCamerasFeedDataMdl(data, function (err, mresult) {
    if (err) {
      return res.send({ 'status': 500, 'data': "Server Error" });

    }
    res.send({ 'status': 200, 'data': mresult });
  });
};

export async function getAiAnalysisTemplesCtrl(req, res) {
  var data = req.body;
  let user = req.user;
  data.temple_id = user.temple_id;
  data.role_type = user.role_type;
  masterMdl.getAiAnalysisTemplesMdl(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
}

export async function newQlineWaitngDetailsCtrl(req, res) {
  let data = req.body
  masterMdl.newQlineWaitngDetailsMdl(data, function (err, results) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ 'status': 200, 'data': results });
  });
}

export async function getcrowdDensityCtrl(req, res) {

  const { temple_id } = req.body;
  
  try {

    const response = await axios({
      method: "GET",
      url: "https://amaravathi.live/api/crowd-density/summary?token=amaravathi-ml-2024-secure"
    });

    const cameras = response.data.cameras;

    const result = Object.values(cameras)
      .filter(cam => cam.temple_id == temple_id)
      .map(cam => ({
        camera_name: cam.camera_name,
        camera_status: cam.camera_status,
        people_in_area: cam.count,
        capacity: cam.area_sq_meters ?? "-",
        density_per_sqm: cam.density_per_sqm,
        density: cam.density,
        // updated_at: cam.updated_at,
        temple_id:cam.temple_id
      }))
      .sort((a, b) => a.camera_name.localeCompare(b.camera_name));
      console.log(result);
      
     res.send({ 'status': 200, 'data': result });

  } catch (error) {

    console.log("API Error:", error.message);

    return res.status(500).json({
      error: "Crowd density API failed"
    });

  }
}

export async function getFireAlertCtrl(req, res) {

  const { temple_id } = req.body;
  
  try {

    const response = await axios({
      method: "GET",
      url: "https://amaravathi.live/api/fire/status?token=amaravathi-ml-2024-secure"
    });

    const cameras = response.data.cameras;

    const result = Object.values(cameras)
      .filter(cam => cam.temple_id == temple_id)
      .map(cam => ({
        camera_name: cam.camera_name,
        camera_status: cam.camera_status,
        fire_status: cam.status,
        fire_ratio: cam.fire_ratio,
        smoke_motion_ratio: cam.smoke_motion_ratio,       
        temple_id:cam.temple_id,
        source:cam.source,
        camera:cam.camera
      }))
      .sort((a, b) => a.camera_name.localeCompare(b.camera_name));
      console.log(result);
      
     res.send({ 'status': 200, 'data': result });

  } catch (error) {

    console.log("API Error:", error.message);

    return res.status(500).json({
      error: "Crowd density API failed"
    });

  }
}

export async function getFireAlertUrlsCtrl(req, res) {
  let data = req.body
  masterMdl.getFireAlertUrlsMdl(data, function (err, results) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ 'status': 200, 'data': results });
  });
}