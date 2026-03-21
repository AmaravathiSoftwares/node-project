import { MySQLConPool } from '../../config/dbconnect.js';
import { sqlinjection } from '../../utils/utils.js';

export function getanalysisdataMdl(callback) {
    var cntxtDtls = "in getcallEnqueryInvoiceIdMdl";
    const QRY_TO_EXEC = `SELECT 
    (SELECT COUNT(*) FROM stations_master where d_in=0) AS police_station,
    (SELECT COUNT(*) FROM officers_master where d_in=0) AS police_persons,
    (SELECT COUNT(*) FROM police_unit_master where d_in=0) AS police_units,
    (SELECT COUNT(*) FROM bb_points where d_in=0) AS deployment_points,
    (SELECT COUNT(*) AS route_count FROM deployment_master WHERE status=1 and d_in = 0 AND DATE(bbdate) = CURDATE()) AS today,
    (SELECT COUNT(*) AS today_count FROM deployment_master WHERE status=1 and d_in = 0 AND YEARWEEK(bbdate, 1) = YEARWEEK(CURDATE(), 1)) AS this_week
    `;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            [],
            cntxtDtls,
            function (err, results) {
                callback(err, results);
                return;
            }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function getlast7daysMdl(callback) {
    var cntxtDtls = "in getcallEnqueryInvoiceIdMdl";
    const QRY_TO_EXEC = `SELECT 
    bbdate, 
    DAYNAME(bbdate) AS day_name, 
    COUNT(*) AS daily_count
FROM deployment_master
WHERE bbdate >= CURDATE() - INTERVAL 7 DAY and d_in=0
GROUP BY bbdate
ORDER BY bbdate ASC;

    `;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            [],
            cntxtDtls,
            function (err, results) {
                callback(err, results);
                return;
            }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function getlastalldaysMdl(callback) {
    var cntxtDtls = "in getcallEnqueryInvoiceIdMdl";
    const QRY_TO_EXEC = `
    SELECT count(*) as count,division from stations_master WHERE d_in=0 GROUP BY division
    `;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            [],
            cntxtDtls,
            function (err, results) {
                callback(err, results);
                return;
            }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};