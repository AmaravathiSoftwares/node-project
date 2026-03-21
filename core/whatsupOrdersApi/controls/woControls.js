import * as mdl from "../models/woModels.js";
import axios from "axios";

export async function getWODarshnamCardsCountCtrl(req, res) {
  var data = req.body;
  mdl.getWODarshnamCardsCountMdl(data, function (err, results) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: results });
  });
}

export async function getWODarshnamdataCtrl(req, res) {
  var data = req.body;

  mdl.getWODarshnamdataMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

//darshanam start
// export async function getdharshanamCtrl(req, res) {
//   var data = req.body;
//   data.role_type = req.user.role_type;
//   data.temple_id = req.user.temple_id;
//   mdl.getdharshanamMdl(data, function (err, cRes) {
//     if (err) {
//       res.send(500, "Server Error");
//       return;
//     }
//     res.send({ status: 200, data: cRes });
//   });
// }

// export async function getDetailsDarshanamByDateCtrl(req, res) {
//   var data = req.body;
//   data.role_type = req.user.role_type;
//   data.temple_id = req.user.temple_id;
//   mdl.getDetailsDarshanamByDateMdl(data, function (err, cRes) {
//     if (err) {
//       res.send(500, "Server Error");
//       return;
//     }
//     res.send({ status: 200, data: cRes });
//   });
// }
//seva start
export async function getSevamoduleCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;

  if (data.front_temple_id) {
    data.temple_id = data.front_temple_id;
  } else {
    data.temple_id = req.user.temple_id;
  }

  mdl.getSevamoduleMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getDetailsSevaByDateCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;
  mdl.getDetailsSevaByDateMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}
//prasadam start
export async function getPrasadammoduleCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;

  if (data.front_temple_id) {
    data.temple_id = data.front_temple_id;
  } else {
    data.temple_id = req.user.temple_id;
  }

  mdl.getPrasadammoduleMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getDetailsPrasadamByDateCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;
  mdl.getDetailsPrasadamByDateMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}
//tonsure start
export async function getTonsuremoduleCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;

  if (data.front_temple_id) {
    data.temple_id = data.front_temple_id;
  } else {
    data.temple_id = req.user.temple_id;
  }
  mdl.getTonsuremoduleMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}
export async function getDetailsTonsureByDateCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;
  mdl.getDetailsTonsureByDateMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

// export async function getTonsuremoduleCtrl(req, res) {
//   var data = req.body;
//   data.role_type = req.user.role_type;
//   data.temple_id = req.user.temple_id;
//   mdl.getTonsuremoduleMdl(data, function (err, cRes) {
//     if (err) {
//       res.send(500, "Server Error");
//       return;
//     }
//     res.send({ status: 200, data: cRes });
//   });
// }

//doantion start
export async function getDonationCardsCountCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;
  mdl.getDonationCardsCountMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getDonationDetailsCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;

  if (data.front_temple_id) {
    data.temple_id = data.front_temple_id;
  } else {
    data.temple_id = req.user.temple_id;
  }
  mdl.getDonationDetailsMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

//analysis
export async function getanalysiscardsCountCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;

  if (data.front_temple_id) {
    data.temple_id = data.front_temple_id;
  } else {
    data.temple_id = req.user.temple_id;
  }

  mdl.getanalysiscardsCountMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getdharshanamtypecountCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;
  mdl.getdharshanamtypecountMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getnextdharshanamtypecountCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;
  mdl.getnextdharshanamtypecountMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getsevatypescountCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;
  mdl.getsevatypescountMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getnextsevendaystypecountCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;
  mdl.getnextsevendaystypecountMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getprasadamtypecountCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;
  mdl.getprasadamtypecountMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getnextsevendaysprasadamCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;
  mdl.getnextsevendaysprasadamMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getnextsevendaystonsuretypesdataCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;
  mdl.getnextsevendaystonsuretypesdataMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getlasttendaysprasadamCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;
  mdl.getlasttendaysprasadamMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function gettonsuretypesdataCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;
  mdl.gettonsuretypesdataMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getaccommodationdataCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;

  if (data.front_temple_id) {
    data.temple_id = data.front_temple_id;
  } else {
    data.temple_id = req.user.temple_id;
  }

  mdl.getaccommodationdataMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
      1;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getDetailsAccommodationByDateCtrl(req, res) {
  var data = req.body;
  console.log(326, req.user);
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;
  mdl.getDetailsAccommodationByDateMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getRevenuecardsCountCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;

  if (data.front_temple_id) {
    data.temple_id = data.front_temple_id;
  } else {
    data.temple_id = req.user.temple_id;
  }
  mdl.getRevenuecardsCountMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getnextsevendaysdatesofeHundiCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;

  if (data.front_temple_id) {
    data.temple_id = data.front_temple_id;
  } else {
    data.temple_id = req.user.temple_id;
  }

  mdl.getnextsevendaysdatesofeHundiMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function totaldonationsofeHundiCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;

  if (data.front_temple_id) {
    data.temple_id = data.front_temple_id;
  } else {
    data.temple_id = req.user.temple_id;
  }

  mdl.totaldonationsofeHundiMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getDateWiseAnalysisCountCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  // data.temple_id = req.user.temple_id;
  if (data.front_temple_id) {
    data.temple_id = data.front_temple_id;
  } else {
    data.temple_id = req.user.temple_id;
  }

  mdl.getDateWiseAnalysisCountMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

// export async function getdharshanamCtrl(req, res) {
//   var data = req.body;
//   data.role_type = req.user.role_type;
//   data.temple_id = req.user.temple_id;

//   if (data.front_temple_id) {
//     data.temple_id = data.front_temple_id;
//   } else {
//     data.temple_id = req.user.temple_id;
//   }

//   mdl.getdharshanamMdl(data, function (err, cRes) {
//     if (err) {
//       res.send(500, "Server Error");
//       return;
//     }
//     res.send({ status: 200, data: cRes });
//   });
// }

export async function getdharshanamCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;

  if (data.front_temple_id) {
    data.temple_id = data.front_temple_id;
  } else {
    data.temple_id = req.user.temple_id;
  }

  let finalResponse = [];

  mdl.getdharshanamMdl(data, function (err, result1) {
    if (err) {
      res.status(500).send("Server Error");
      return;
    }

    finalResponse[0] = result1;

    mdl.getdharshanamBreakupPointsMdl(data, function (err2, result2) {
      if (err2) {
        res.status(500).send("Server Error");
        return;
      }

      finalResponse[1] = result2;

      res.send({
        status: 200,
        data: finalResponse,
      });
    });
  });
}

export async function getDetailsDarshanamByDateCtrl(req, res) {
  var data = req.body;
  console.log(data, 488);

  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;

  if (data.from.front_temple_id) {
    data.temple_id = data.from.front_temple_id;
  } else {
    data.temple_id = req.user.temple_id;
  }

  mdl.getDetailsDarshanamByDateMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getDropdownNewTemplesNamesCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;
  mdl.getDropdownNewTemplesNamesMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function geDistrictWiseTemplesdataCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;
  mdl.geDistrictWiseTemplesdataMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getalltemplesdataInformationCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;
  mdl.getalltemplesdataInformationMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getalltemplesdataInformationByFilterCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;
  mdl.getalltemplesdataInformationByFilterMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

// ANALYSIS STARTS

// Darshanam Analysis
export function getDarshanamOrderSourceCtrl(req, res) {
  var data = req.body;

  mdl.getDarshanamOrderSourceMdl(data, function (err, cRes) {
    if (err) {
      res.status(500).send("Server Error");
      return;
    }

    res.send({
      status: 200,
      data: cRes,
    });
  });
}
export async function getCardsDataCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;
  mdl.getCardsDataMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getRevenueTrendCtrl(req, res) {
  let data = req.body;
  data.temple_id = req.user.temple_id;

  mdl.getRevenueTrendMdl(data, function (err, result) {
    if (err) {
      return res.status(500).send("Server Error");
    }

    res.send({
      status: 200,
      data: result,
    });
  });
}

export async function getPaymentStatusCtrl(req, res) {
  let data = req.body;
  data.temple_id = req.user.temple_id;

  mdl.getPaymentStatusMdl(data, (err, result) => {
    if (err) return res.status(500).send("error");

    res.send({ status: 200, data: result });
  });
}

export async function getTemplePerformanceCtrl(req, res) {
  let data = req.body;
  data.temple_id = req.user.temple_id;

  mdl.getTemplePerformanceMdl(data, (err, result) => {
    if (err) return res.status(500).send("error");

    res.send({ status: 200, data: result });
  });
}
export async function getDarshanRevenueCtrl(req, res) {
  let data = req.body;
  data.temple_id = req.user.temple_id;

  mdl.getDarshanRevenueMdl(data, (err, result) => {
    if (err) return res.status(500).send("error");

    res.send({ status: 200, data: result });
  });
}

//  ###### ROW 5 ######

//  ROW 6

export async function getDarshanPopularityCtrl(req, res) {
  let data = req.body;
  data.temple_id = req.user.temple_id;

  mdl.getDarshanPopularityMdl(data, (err, result) => {
    if (err) return res.status(500).send("error");

    res.send({ status: 200, data: result });
  });
}

export async function getGroupSizeCtrl(req, res) {
  let data = req.body;
  data.temple_id = req.user.temple_id;

  mdl.getGroupSizeMdl(data, (err, result) => {
    if (err) return res.status(500).send("error");

    res.send({ status: 200, data: result });
  });
}

// Seva Analysis

export function getSevaOrderSourceCtrl(req, res) {
  var data = req.body;

  mdl.getSevaOrderSourceMdl(data, function (err, cRes) {
    if (err) {
      res.status(500).send("Server Error");
      return;
    }

    res.send({
      status: 200,
      data: cRes,
    });
  });
}
export async function getSevaCardsDataCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;
  mdl.getSevaCardsDataMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export function getSevaRevenueTrendCtrl(req, res) {
  let data = req.body;
  data.temple_id = req.user.temple_id;

  mdl.getSevaRevenueTrendMdl(data, (err, result) => {
    if (err) {
      res.status(500).send("Server Error");
      return;
    }

    res.send({ status: 200, data: result });
  });
}

export function getBookingTrendCtrl(req, res) {
  let data = req.body;
  data.temple_id = req.user.temple_id;

  mdl.getBookingTrendMdl(data, (err, result) => {
    if (err) {
      res.status(500).send("Server Error");
      return;
    }

    res.send({ status: 200, data: result });
  });
}

export function getTopSevasCtrl(req, res) {
  let data = req.body;
  data.temple_id = req.user.temple_id;

  mdl.getTopSevasMdl(data, (err, result) => {
    if (err) {
      res.status(500).send("Server Error");
      return;
    }

    res.send({ status: 200, data: result });
  });
}

export function getTempleRevenueCtrl(req, res) {
  let data = req.body;

  mdl.getTempleRevenueMdl(data, (err, result) => {
    if (err) {
      res.status(500).send("Server Error");
      return;
    }

    res.send({ status: 200, data: result });
  });
}

export function getGenderDistributionCtrl(req, res) {
  let data = req.body;
  data.temple_id = req.user.temple_id;

  mdl.getGenderDistributionMdl(data, (err, result) => {
    if (err) {
      res.status(500).send("Server Error");
      return;
    }

    res.send({ status: 200, data: result });
  });
}

export function getMonthlyGrowthCtrl(req, res) {
  let data = req.body;
  data.temple_id = req.user.temple_id;

  mdl.getMonthlyGrowthMdl(data, (err, result) => {
    if (err) {
      res.status(500).send("Server Error");
      return;
    }

    res.send({ status: 200, data: result });
  });
}

// Temple Dropdown
export async function getTempleDropdownDataCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;
  mdl.getTempleDropdownDataMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

// 13-03-2026
export async function getRevenueDistributionCtrl(req, res) {
  mdl.getRevenueDistributionMdl({}, (err, result) => {
    if (err) {
      return res.status(500).send("Server Error");
    }

    res.send({
      status: 200,
      data: result,
    });
  });
}

export async function getMonthlyRevenueTrendCtrl(req, res) {
  mdl.getMonthlyRevenueTrendMdl(req.body, (err, result) => {
    if (err) {
      return res.status(500).send("Server Error");
    }

    res.send({
      status: 200,
      data: result,
    });
  });
}

export async function getTempleRevenueShareCtrl(req, res) {
  mdl.getTempleRevenueShareMdl({}, (err, result) => {
    if (err) {
      return res.status(500).send("Server Error");
    }

    res.send({
      status: 200,
      data: result,
    });
  });
}

export async function getTopTempleRevenueCtrl(req, res) {
  mdl.getTopTempleRevenueMdl({}, (err, result) => {
    if (err) {
      return res.status(500).send("Server Error");
    }

    res.send({
      status: 200,
      data: result,
    });
  });
}

export async function getTempleInsightsCtrl(req, res) {
  mdl.getTempleInsightsMdl({}, (err, result) => {
    if (err) {
      return res.status(500).send("Server Error");
    }

    res.send({
      status: 200,
      data: result[0],
    });
  });
}

export async function getTemplePerformanceScatterCtrl(req, res) {
  var data = req.body;

  mdl.getTemplePerformanceScatterMdl(data, function (err, cRes) {
    if (err) {
      res.status(500).send("Server Error");
      return;
    }

    res.send({
      status: 200,
      data: cRes,
    });
  });
}

// Prasadam Analysis

export function getOrderSourceDistributionCtrl(req, res) {
  var data = req.body;

  mdl.getOrderSourceDistributionMdl(data, function (err, cRes) {
    if (err) {
      res.status(500).send("Server Error");
      return;
    }

    res.send({
      status: 200,
      data: cRes,
    });
  });
}
export function getPrasadmCardsDataCtrl(req, res) {
  mdl.getPrasadmCardsDataMdl(req.body, function (err, cRes) {
    if (err) {
      res.status(500).send("Server Error");
      return;
    }

    res.send({
      status: 200,
      data: cRes,
    });
  });
}

export function getPrasadamRevenueTrendCtrl(req, res) {
  mdl.getPrasadamRevenueTrendMdl(req.body, function (err, cRes) {
    if (err) {
      res.status(500).send("Server Error");
      return;
    }

    res.send({
      status: 200,
      data: cRes,
    });
  });
}

export function getTopPrasadamCtrl(req, res) {
  mdl.getTopPrasadamMdl(req.body, function (err, cRes) {
    if (err) {
      res.status(500).send("Server Error");
      return;
    }

    res.send({
      status: 200,
      data: cRes,
    });
  });
}

export function getPrasadamTempleRevenueShareCtrl(req, res) {
  var data = req.body;

  mdl.getPrasadamTempleRevenueShareMdl(data, function (err, cRes) {
    if (err) {
      res.status(500).send("Server Error");
      return;
    }

    res.send({
      status: 200,
      data: cRes,
    });
  });
}

export function getDailyOrdersCtrl(req, res) {
  var data = req.body;

  mdl.getDailyOrdersMdl(data, function (err, cRes) {
    if (err) {
      res.status(500).send("Server Error");
      return;
    }

    res.send({
      status: 200,
      data: cRes,
    });
  });
}

export function getPrasadamRevenueDistributionCtrl(req, res) {
  var data = req.body;

  mdl.getPrasadamRevenueDistributionMdl(data, function (err, cRes) {
    if (err) {
      res.status(500).send("Server Error");
      return;
    }

    res.send({
      status: 200,
      data: cRes,
    });
  });
}

// Tonsure Analysis
export function getTonsureCardsDataCtrl(req, res) {
  mdl.getTonsureCardsDataMdl(req.body, function (err, cRes) {
    if (err) {
      res.status(500).send("Server Error");
      return;
    }

    res.send({
      status: 200,
      data: cRes,
    });
  });
}

export function tonsureDashboardAnalyticsCtrl(req, res) {
  const data = req.body;

  mdl.tonsureDashboardAnalyticsMdl(data, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send("Server Error");
      return;
    }

    res.send({
      status: 200,
      data: result,
    });
  });
}

// Seva Analysis
export function getTopTemplesRevenueCtrl(req, res) {
  var data = req.body;

  mdl.getTopTemplesRevenueMdl(data, function (err, cRes) {
    if (err) {
      res.status(500).send("Server Error");
      return;
    }

    res.send({
      status: 200,
      data: cRes,
    });
  });
}

export function getTopSevasRevenueCtrl(req, res) {
  var data = req.body;

  mdl.getTopSevasRevenueMdl(data, function (err, cRes) {
    if (err) {
      res.status(500).send("Server Error");
      return;
    }

    res.send({
      status: 200,
      data: cRes,
    });
  });
}

// Prasadam Analysis

// Top 10 Temples Revenue Controller
export function getTopTenTemplesRevenueCtrl(req, res) {
  mdl.getTopTenTemplesRevenueMdl(req.body, (err, cRes) => {
    if (err) {
      res.status(500).send("Server Error");
      return;
    }
    res.send({
      status: 200,
      data: cRes,
    });
  });
}

// Top 10 Prasadam Revenue Controller
export function getTopTenPrasadamRevenueCtrl(req, res) {
  mdl.getTopTenPrasadamRevenueMdl(req.body, (err, cRes) => {
    if (err) {
      res.status(500).send("Server Error");
      return;
    }
    res.send({
      status: 200,
      data: cRes,
    });
  });
}

// Month Growth Controller
export function getMonthGrowthCtrl(req, res) {
  mdl.getMonthGrowthMdl(req.body, (err, cRes) => {
    if (err) {
      res.status(500).send("Server Error");
      return;
    }
    res.send({
      status: 200,
      data: cRes,
    });
  });
}

export function getTopCategorySevasCtrl(req, res) {
  var data = req.body;

  mdl.getTopCategorySevasMdl(data, function (err, cRes) {
    if (err) {
      res.status(500).send("Server Error");
      return;
    }

    res.send({
      status: 200,
      data: cRes,
    });
  });
}

// ANALYSIS ENDS

export async function getConsolidateddataCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;

  mdl.gettemplenameforconsoldatedReport(data, function (err, templeRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }

    mdl.getConsolidateddataMdl(data, function (err, cRes) {
      if (err) {
        res.send(500, "Server Error");
        return;
      }

      res.send({ status: 200, temple: templeRes, data: cRes.data, total_amount: cRes.total_amount });
    });
  });
}


export async function getTempleWiseDonationsCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;
  mdl.getTempleWiseDonationsMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getTopFiveDonationsCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;

  mdl.getTopFiveDonationsMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getLeastFiveDonationsCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;
  mdl.getLeastFiveDonationsCtrl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getLast7DaysDonationsCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;

  if (data.front_temple_id) {
    data.temple_id = data.front_temple_id;
  } else {
    data.temple_id = req.user.temple_id;
  }

  mdl.getLast7DaysDonationsMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getehunicardsAnalysisCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;

  if (data.front_temple_id) {
    data.temple_id = data.front_temple_id;
  } else {
    data.temple_id = req.user.temple_id;
  }

  mdl.getehunicardsAnalysisMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getOrderByDonationsCtrl(req, res) {
  var data = req.body;
  data.role_type = req.user.role_type;
  data.temple_id = req.user.temple_id;

  if (data.front_temple_id) {
    data.temple_id = data.front_temple_id;
  } else {
    data.temple_id = req.user.temple_id;
  }

  mdl.getOrderByDonationsMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}
