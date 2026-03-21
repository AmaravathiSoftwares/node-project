import { MySQLConPool } from '../../../config/dbconnect.js';
import { sqlinjection } from '../../../utils/utils.js';
import moment from "moment-timezone";

// <-----------------------------------------Districts--------------------------------------->
export function getdistricts(data, callback) {
    var cntxtDtls = "in getdistricts";
    var QRY_TO_EXEC = `Select district_name , id from districts_data where d_in =  0  order by display_number asc;`
    let paramsData = []
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function getmandals(data, callback) {
    var cntxtDtls = "in getmandals";
    var QRY_TO_EXEC = `Select mandal_id , mandal_name , district_id from mandal_list where d_in =  0 and district_id = ?  order by display_number asc;`
    let paramsData = [data.dist_id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function getvillagesbymandalid(data, callback) {
    var cntxtDtls = "in getvillagesbymandalid";
    var QRY_TO_EXEC = `Select village_id , village_name from village_data where d_in =  0 and mandal_id = ?  order by display_number asc;`
    let paramsData = [data.mandal_id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function getconstituenciesbydistrictid(data, callback) {
    var cntxtDtls = "in getconstituenciesbydistrictid";
    var QRY_TO_EXEC = `Select constituency_id , constituency_name from constituency_data where d_in =  0 and district_id = ?  order by constituency_name asc;`
    let paramsData = [data.dist_id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function submitttdmandirrequest(data, callback) {
    const cntxtDtls = "in submitttdmandirrequest";

    const IST = "Asia/Kolkata";
    const createdAt = moment().tz(IST).format("YYYY-MM-DD");
    const createdtime = moment().tz(IST).format('HH:mm:ss');

    // Single clean object to insert
    const values = {
        district_id: data.district,
        mandal_id: data.mandal,
        village_id: data.villageName,
        constituency_id: data.assemblyConstituency,

        latitude: data.latitude,
        longitude: data.longitude,
        population: data.population,
        scStFishermen: data.scStFishermen,

        requesterName: data.requesterName,
        templeName: data.templeName,
        deity: data.deity,

        holder_name: data.holder_name,
        account_no: data.account_no,
        bank_name: data.bank_name,
        ifsc: data.ifsc,
        bank_branch: data.bank_branch,

        landExtent: data.landExtent,
        landvests: data.landvests,
        survey_no: data.survey_no,

        Boundaries_east: data.Boundaries_east,
        Boundaries_south: data.Boundaries_south,
        Boundaries_west: data.Boundaries_west,
        Boundaries_north: data.Boundaries_north,

        Panchayat_record: data.Panchayat_record,
        donating_land: data.donating_land,
        formed_committee: data.formed_committee,
        Bhajan_activity: data.Bhajan_activity,

        works_proposed: data.works_proposed,
        amount_proposed: data.amount_proposed,
        received_from_TTD: data.received_from_TTD,
        Financial_assistance: data.Financial_assistance,

        temples_available_nearby: data.temples_available_nearby,
        villages_covered: data.villages_covered,
        Amount_in_Rs_proposed: data.Amount_in_Rs_proposed,
        endorsement_made: data.endorsement_made,

        person_name: data.person_name,
        person_no: data.person_no,
        person_address: data.person_address,
        Other_relevant_issues: data.Other_relevant_issues,

        created_at: createdAt,
        created_time: createdtime,
        d_in: 0
    };

    const QRY_TO_EXEC = `INSERT INTO ttd_mandiralu_requests SET ?`;

    console.log("Insert Values:", values);

    if (callback && typeof callback === "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, values, cntxtDtls, function (err, results) {
            callback(err, results);
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, values, cntxtDtls);
    }
}



export function submitotherstemplesnearby(lastid, data, callback) {
    const cntxtDtls = "in submitotherstemplesnearby";

    let QRY_TO_EXEC = `
        INSERT INTO ttd_mandirrequestsnearbytemple
        (ttd_mandir_id, temple_name, distance)
        VALUES `;

    const params = [];

    const placeholders = data.map(item => {
        params.push(lastid, item.name, item.distance);
        return "(?, ?, ?)";
    });

    QRY_TO_EXEC += placeholders.join(", ") + ";";

    if (callback && typeof callback === "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, params, cntxtDtls, (err, results) => {
            callback(err, results);
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, params, cntxtDtls);
    }
}


export function getRequestsformandir(callback) {
    var cntxtDtls = "in getRequestsformandir";
    var QRY_TO_EXEC = `SELECT b.district_name, c.mandal_name, a.village_id as village_name, a.constituency_id as constituency_name, a.*,  ( SELECT CONCAT( '[', GROUP_CONCAT( CONCAT( '{"temple_name":"', REPLACE(nt.temple_name, '"', '\\"'), '"', ',"distance":', nt.distance, '}' ) ), ']' ) FROM ttd_mandirrequestsnearbytemple nt WHERE nt.ttd_mandir_id = a.ID ) AS nearby_temples FROM ttd_mandiralu_requests a LEFT JOIN districts_data b ON a.district_id = b.id LEFT JOIN mandal_list c ON a.mandal_id = c.mandal_id  where a.d_in='0' GROUP BY a.id  order by a.id desc;`
    let paramsData = []
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};



export function getdistrictRequestscountformandir(callback) {
    var cntxtDtls = "in getdistrictRequestscountformandir";
    var QRY_TO_EXEC = `SELECT COUNT(a.district_id) AS reqcount, b.district_name , a.district_id FROM districts_data AS b LEFT JOIN ttd_mandiralu_requests AS a ON a.district_id = b.id where a.d_in='0' GROUP BY b.id, b.district_name ORDER BY reqcount desc, b.district_name ASC;
`
    let paramsData = []
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


export function getdistrictRequestsformandir(data, callback) {
    var cntxtDtls = "in getdistrictRequestsformandir";
    var QRY_TO_EXEC = `SELECT b.district_name, c.mandal_name, d.village_name, e.constituency_name, a.*,  ( SELECT CONCAT( '[', GROUP_CONCAT( CONCAT( '{"temple_name":"', REPLACE(nt.temple_name, '"', '\\"'), '"', ',"distance":', nt.distance, '}' ) ), ']' ) FROM ttd_mandirrequestsnearbytemple nt WHERE nt.ttd_mandir_id = a.ID ) AS nearby_temples FROM ttd_mandiralu_requests a LEFT JOIN districts_data b ON a.district_id = b.id LEFT JOIN mandal_list c ON a.mandal_id = c.mandal_id LEFT JOIN village_data d ON a.village_id = d.village_id LEFT JOIN constituency_data e ON a.constituency_id = e.constituency_id where a.d_in='0' and a.district_id=? GROUP BY a.id  order by a.id desc;`
    let paramsData = [data.district_id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}


export function editttdmandirrequest(data, user, callback) {
    const cntxtDtls = "in editttdmandirrequest";

    const IST = "Asia/Kolkata";
    const updatedAt = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");

    // 🔹 Base update fields (NON-image)
    const values = {
        // district_id: data.district,
        // mandal_id: data.mandal,
        // village_id: data.villageName,
        // constituency_id: data.assemblyConstituency,

        latitude: data.latitude,
        longitude: data.longitude,
        population: data.population,
        scStFishermen: data.scStFishermen,

        requesterName: data.requesterName,
        templeName: data.templeName,
        deity: data.deity,

        holder_name: data.holder_name,
        account_no: data.account_no,
        bank_name: data.bank_name,
        ifsc: data.ifsc,
        bank_branch: data.bank_branch,

        landExtent: data.landExtent,
        landvests: data.landvests,
        survey_no: data.survey_no,

        Boundaries_east: data.Boundaries_east,
        Boundaries_south: data.Boundaries_south,
        Boundaries_west: data.Boundaries_west,
        Boundaries_north: data.Boundaries_north,

        Panchayat_record: data.Panchayat_record,
        donating_land: data.donating_land,
        formed_committee: data.formed_committee,
        Bhajan_activity: data.Bhajan_activity,

        works_proposed: data.works_proposed,
        amount_proposed: data.amount_proposed,
        received_from_TTD: data.received_from_TTD,
        Financial_assistance: data.Financial_assistance,

        temples_available_nearby: data.temples_available_nearby,
        villages_covered: data.villages_covered,
        Amount_in_Rs_proposed: data.Amount_in_Rs_proposed,
        endorsement_made: data.endorsement_made,

        person_name: data.person_name,
        person_no: data.person_no,
        person_address: data.person_address,
        Other_relevant_issues: data.Other_relevant_issues,

        updated_by: user,
        updated_at: updatedAt,
    };

    // 🔹 UPDATE IMAGE FIELDS ONLY IF PROVIDED
    if (data.temple_commitee_doc_url)
        values.temple_commitee_doc = data.temple_commitee_doc_url;

    if (data.bank_passbook_doc_url)
        values.bank_passbook_doc = data.bank_passbook_doc_url;

    if (data.land_title_doc_url)
        values.land_title_doc = data.land_title_doc_url;

    if (data.adangla_ib_doc_url)
        values.adangla_ib_doc = data.adangla_ib_doc_url;

    if (data.donor_acceptance_doc_url)
        values.donor_acceptance_doc = data.donor_acceptance_doc_url;

    if (data.ceritified_doc_url)
        values.ceritified_doc = data.ceritified_doc_url;

    if (data.aadhaar_doc_url)
        values.aadhaar_doc = data.aadhaar_doc_url;

    // 🔹 FINAL UPDATE QUERY
    const QRY_TO_EXEC = ` UPDATE ttd_mandiralu_requests SET ? WHERE id = ? `;

    console.log("Update Values:", values, "Record ID:", data.record_id);

    if (callback && typeof callback === "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            [values, data.record_id],
            cntxtDtls,
            callback
        );
    } else {
        return sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            [values, data.record_id],
            cntxtDtls
        );
    }
}



export function getdistrictsdataMdl(callback) {
    var cntxtDtls = "in getdistrictsdataMdl";
    var QRY_TO_EXEC = `SELECT * FROM districts_data where d_in=0`
    let paramsData = []
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getallditrictsbmdataMdl(callback) {
    var cntxtDtls = "in getallditrictsbmdataMdl";
    var QRY_TO_EXEC = 'SELECT a.id ,  a.district_name, count(b.id) as total , COUNT(CASE WHEN b.status = 1 THEN 1 END) AS status_1, COUNT(CASE WHEN b.status = 2 THEN 1 END) AS status_2, COUNT(CASE WHEN b.status = 3 THEN 1 END) AS status_3, COUNT(CASE WHEN b.status = 4 THEN 1 END) AS status_4, COUNT(CASE WHEN b.status = 5 THEN 1 END) AS status_5, COUNT(CASE WHEN b.status = 6 THEN 1 END) AS status_6 FROM districts_data a LEFT JOIN ttd_bm_data b ON a.id = b.dist_id GROUP BY a.id ORDER BY a.district_name;'
    let paramsData = []
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

// export function getbmdataCountsMdl(callback) {
//     var cntxtDtls = "in getbmdataCountsMdl";


//     var QRY_TO_EXEC = `SELECT count(b.id) as total , COUNT(CASE WHEN b.status = 1 THEN 1 END) AS status_1, COUNT(CASE WHEN b.status = 2 THEN 1 END) AS status_2, COUNT(CASE WHEN b.status = 3 THEN 1 END) AS status_3, COUNT(CASE WHEN b.status = 4 THEN 1 END) AS status_4, COUNT(CASE WHEN b.status = 5 THEN 1 END) AS status_5, COUNT(CASE WHEN b.status = 6 THEN 1 END) AS status_6 FROM ttd_bm_data b;`

//     let paramsData = []
//     if (callback && typeof callback == "function") {
//         sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
//             callback(err, results);
//             return;
//         });
//     }
//     else
//         return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
// }

export function getconstuencydataMdl(callback) {
    var cntxtDtls = "in getconstuencydataMdl";
    var QRY_TO_EXEC = `SELECT * FROM bm_constituency_details where d_in=? order by c_name asc`
    let paramsData = [0]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getttdbmconstdataMdl(data, callback) {
    var cntxtDtls = "in getttdbmconstdataMdl";
    let qry = ''
    let paramsData = []

    if (data.const_id != 0) {
        qry = `and constituency_id=?`
        paramsData = [0, data.const_id]
    } else {
        qry = ''
        paramsData = [0]
    }

    var QRY_TO_EXEC = `SELECT * FROM ttd_bm_data where d_in=? ${qry} order by constituency asc`


    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}



export function getbmdataCountsMdl(callback) {
    var cntxtDtls = "in getbmdataCountsMdl";
    var QRY_TO_EXEC = `SELECT count(b.id) as total , COUNT(CASE WHEN b.status = 1 THEN 1 END) AS status_1, COUNT(CASE WHEN b.status = 2 THEN 1 END) AS status_2, COUNT(CASE WHEN b.status = 3 THEN 1 END) AS status_3, COUNT(CASE WHEN b.status = 4 THEN 1 END) AS status_4, COUNT(CASE WHEN b.status = 5 THEN 1 END) AS status_5, COUNT(CASE WHEN b.status = 6 THEN 1 END) AS status_6 FROM ttd_bm_data b;`
    let paramsData = []
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getcardmodeldataMdl(data, callback) {
    var cntxtDtls = "in getcardmodeldataMdl";
    console.log(data);

    let qry = ''
    let val = []
    if (data.ind == 0) {
        qry = ''
        val = [0]
    } else {
        qry = `and status=?`
        val = [0, data.ind]
    }

    var QRY_TO_EXEC = `SELECT * FROM ttd_bm_data where d_in=? ${qry} order by id`

    console.log(QRY_TO_EXEC);


    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, val, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getconsultancywisereportdataMdl(data,callback) {
    var cntxtDtls = "in getconsultancywisereportdataMdl";

    var QRY_TO_EXEC = `SELECT a.c_no,a.c_name,b.dist_id,b.dist_name,count(b.id) as total , COUNT(CASE WHEN b.status = 1 THEN 1 END) AS status_1, COUNT(CASE WHEN b.status = 2 THEN 1 END) AS status_2, COUNT(CASE WHEN b.status = 3 THEN 1 END) AS status_3, COUNT(CASE WHEN b.status = 4 THEN 1 END) AS status_4, COUNT(CASE WHEN b.status = 5 THEN 1 END) AS status_5, COUNT(CASE WHEN b.status = 6 THEN 1 END) AS status_6 FROM bm_constituency_details a LEFT JOIN ttd_bm_data b ON a.c_no = b.constituency_id where b.dist_id=? GROUP BY a.c_no ORDER BY a.c_name;`

    let paramsData = [data.id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getcarddatabyconstituencyMdl(data, callback) {
    var cntxtDtls = "in getcarddatabyconstituencyMdl";
    console.log(data);

    let qry = ''
    let val = []
    if (data.ind == 0) {
        qry = ''
        val = [data.id,0]
    } else {
        qry = `and status=?`
        val = [data.id,0, data.ind]
    }

    var QRY_TO_EXEC = `SELECT * FROM ttd_bm_data where dist_id=? and d_in=? ${qry} order by id`

    console.log(QRY_TO_EXEC);


    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, val, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getmandalwisereportdataMdl(data,callback) {
    var cntxtDtls = "in getmandalwisereportdataMdl";
    var QRY_TO_EXEC = `SELECT b.constituency_id,b.mandal_id,b.mandal,count(b.id) as total , COUNT(CASE WHEN b.status = 1 THEN 1 END) AS status_1, COUNT(CASE WHEN b.status = 2 THEN 1 END) AS status_2, COUNT(CASE WHEN b.status = 3 THEN 1 END) AS status_3, COUNT(CASE WHEN b.status = 4 THEN 1 END) AS status_4, COUNT(CASE WHEN b.status = 5 THEN 1 END) AS status_5, COUNT(CASE WHEN b.status = 6 THEN 1 END) AS status_6 FROM ttd_bm_data b where b.constituency_id=? GROUP BY mandal_id ORDER BY mandal;`

    let paramsData = [data.id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}


export function getcarddatabymandalMdl(data, callback) {
    var cntxtDtls = "in getcarddatabymandalMdl";
    console.log(data);

    let qry = ''
    let val = []
    if (data.ind == 0) {
        qry = ''
        val = [data.id,0]
    } else {
        qry = `and status=?`
        val = [data.id,0, data.ind]
    }

    var QRY_TO_EXEC = `SELECT * FROM ttd_bm_data where constituency_id=? and d_in=? ${qry} order by id`

    console.log(QRY_TO_EXEC);


    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, val, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getindividualwisereportdataMdl(data,callback) {
    var cntxtDtls = "in getindividualwisereportdataMdl";
    var QRY_TO_EXEC = `SELECT b.village,count(b.id) as total , COUNT(CASE WHEN b.status = 1 THEN 1 END) AS status_1, COUNT(CASE WHEN b.status = 2 THEN 1 END) AS status_2, COUNT(CASE WHEN b.status = 3 THEN 1 END) AS status_3, COUNT(CASE WHEN b.status = 4 THEN 1 END) AS status_4, COUNT(CASE WHEN b.status = 5 THEN 1 END) AS status_5, COUNT(CASE WHEN b.status = 6 THEN 1 END) AS status_6 FROM ttd_bm_data b where b.mandal_id=? GROUP BY village ORDER BY village;`

    let paramsData = [data.id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getindividualcarddatabymandalMdl(data, callback) {
    var cntxtDtls = "in getindividualcarddatabymandalMdl";

    let qry = ''
    let val = []
    if (data.ind == 0) {
        qry = ''
        val = [data.id,0]
    } else {
        qry = `and status=?`
        val = [data.id,0, data.ind]
    }

    var QRY_TO_EXEC = `SELECT * FROM ttd_bm_data where mandal_id=? and d_in=? ${qry} order by id`

    console.log(QRY_TO_EXEC);


    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, val, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getdistrictdropdowndataMdl(data,callback) {
    var cntxtDtls = "in getdistrictdropdowndataMdl";
    var QRY_TO_EXEC = 'SELECT a.id,a.district_name, count(b.id) as total , COUNT(CASE WHEN b.status = 1 THEN 1 END) AS status_1, COUNT(CASE WHEN b.status = 2 THEN 1 END) AS status_2, COUNT(CASE WHEN b.status = 3 THEN 1 END) AS status_3, COUNT(CASE WHEN b.status = 4 THEN 1 END) AS status_4, COUNT(CASE WHEN b.status = 5 THEN 1 END) AS status_5, COUNT(CASE WHEN b.status = 6 THEN 1 END) AS status_6 FROM districts_data a LEFT JOIN ttd_bm_data b ON a.id = b.dist_id and b.dist_id=? where a.id=? GROUP BY a.id ORDER BY a.district_name;'
    let paramsData = [data.id,data.id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getconstituencydatabydistrictMdl(data,callback) {
    var cntxtDtls = "in getconstituencydatabydistrictMdl";
    var QRY_TO_EXEC = 'select a.c_no,a.c_name from bm_constituency_details a join ttd_bm_data b on a.c_no=b.constituency_id where b.dist_id=? and b.d_in=? GROUP by b.constituency_id;'
    let paramsData = [data.id,0]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getallconstituencystatusdataMdl(data,callback) {
    var cntxtDtls = "in getallconstituencystatusdataMdl";
    var QRY_TO_EXEC = 'SELECT a.c_no,a.c_name, b.dist_id,count(b.id) as total , COUNT(CASE WHEN b.status = 1 THEN 1 END) AS status_1, COUNT(CASE WHEN b.status = 2 THEN 1 END) AS status_2, COUNT(CASE WHEN b.status = 3 THEN 1 END) AS status_3, COUNT(CASE WHEN b.status = 4 THEN 1 END) AS status_4, COUNT(CASE WHEN b.status = 5 THEN 1 END) AS status_5, COUNT(CASE WHEN b.status = 6 THEN 1 END) AS status_6 FROM bm_constituency_details a LEFT JOIN ttd_bm_data b ON a.c_no = b.constituency_id and b.constituency_id=? where a.c_no=? GROUP BY a.c_no ORDER BY a.c_name;'
    let paramsData = [data.id,data.id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getconstituencydropdownMdl(data,callback) {
    var cntxtDtls = "in getconstituencydropdownMdl";
    var QRY_TO_EXEC = 'SELECT a.c_no,a.c_name, count(b.id) as total , COUNT(CASE WHEN b.status = 1 THEN 1 END) AS status_1, COUNT(CASE WHEN b.status = 2 THEN 1 END) AS status_2, COUNT(CASE WHEN b.status = 3 THEN 1 END) AS status_3, COUNT(CASE WHEN b.status = 4 THEN 1 END) AS status_4, COUNT(CASE WHEN b.status = 5 THEN 1 END) AS status_5, COUNT(CASE WHEN b.status = 6 THEN 1 END) AS status_6 FROM bm_constituency_details a LEFT JOIN ttd_bm_data b ON a.c_no = b.constituency_id and b.constituency_id=? where a.c_no=? GROUP BY a.c_no ORDER BY a.c_name;;'
    let paramsData = [data.id,data.id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getmandalstatusdropdownMdl(data,callback) {
    var cntxtDtls = "in getmandalstatusdropdownMdl";
    var QRY_TO_EXEC = 'SELECT a.mandal_id,a.mandal_name as mandal, b.dist_id,count(b.id) as total , COUNT(CASE WHEN b.status = 1 THEN 1 END) AS status_1, COUNT(CASE WHEN b.status = 2 THEN 1 END) AS status_2, COUNT(CASE WHEN b.status = 3 THEN 1 END) AS status_3, COUNT(CASE WHEN b.status = 4 THEN 1 END) AS status_4, COUNT(CASE WHEN b.status = 5 THEN 1 END) AS status_5, COUNT(CASE WHEN b.status = 6 THEN 1 END) AS status_6 FROM mandal_list a LEFT JOIN ttd_bm_data b ON a.mandal_id = b.mandal_id and b.mandal_id=? where a.mandal_id=? GROUP BY a.mandal_id ORDER BY a.mandal_name;'
    let paramsData = [data.id,data.id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getmandaldropdowndataMdl(data,callback) {
    var cntxtDtls = "in getmandaldropdowndataMdl";
    var QRY_TO_EXEC = 'select a.mandal_id,a.mandal_name from mandal_list a join ttd_bm_data b on a.mandal_id=b.mandal_id where b.constituency_id=? and b.d_in=? GROUP by b.mandal_id;'
    let paramsData = [data.id,0]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function sanctionamountMdl(data, callback) {
    console.log(data);
    var paramsData = []

    var cntxtDtls = "in sanctionamountMdl";
    const IST = "Asia/Kolkata";
    const updatedAt = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
    if (data.stage == 1) {
        var QRY_TO_EXEC = 'update ttd_bm_data set status=?,sanctioned_amount=?,sanctioned_by=?, sanctioned_date=?, remarks=? where id=?' //change only query 07032026
        paramsData = [data.stage, data.amount, data.user_id, updatedAt, data.remarks, data.id]
    } else {
        var QRY_TO_EXEC = 'update ttd_bm_data set status=?,sanctioned_by=?, sanctioned_date=?, remarks=? where id=?'
        paramsData = [data.stage, data.user_id, updatedAt, data.remarks, data.id]
    }
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function postsanctionedstagesMdl(data, callback) {
    var cntxtDtls = "in postsanctionedstagesMdl";
    const IST = "Asia/Kolkata";
    const updatedAt = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
    var QRY_TO_EXEC = 'INSERT INTO  ttd_sanctioned_stages (main_id, stage, amount, img1,img2,img3,img4,i_ts,updated_by) VALUES (?,?,?,?,?,?,?,?,?)'
    let paramsData = [data.main_id, data.stage, data.amount, data.img1, data.img2, data.img3, data.img4, updatedAt, data.user_id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getsanctionedamountlistMdl(data, callback) {
    var cntxtDtls = "in getsanctionedamountlistMdl";
    var QRY_TO_EXEC = 'select a.temple_name,a.sanctioned_amount,b.* from ttd_bm_data a join ttd_sanctioned_stages b on a.id=b.main_id where b.main_id=? order by b.id desc;'
    let paramsData = [data.id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

