import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

export const generateDarshnamPdfTicket = async (reqId) => {
    try {
        const datetimestamp = Date.now();
        const randomNumber = Math.floor(100000 + Math.random() * 900000);
        const uniqueNumber = `${randomNumber}${datetimestamp}`;

        const dirPath = "/mnt/uploads/whatsappservice/tickets/darshnam";
        const filePath = path.join(dirPath, `${uniqueNumber}.pdf`);

        // ensure directory exists
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        const browser = await puppeteer.launch({
            headless: "new",
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });

        const page = await browser.newPage();

        await page.goto(`https://endowmentsinfo.ap.gov.in/phpfiles/index.php?getvalue=${reqId}`, { waitUntil: "networkidle0" });

        await page.pdf({
            path: filePath,
            format: "A4",
            printBackground: true,
            margin: {
                top: "12mm",
                bottom: "12mm",
                left: "12mm",
                right: "12mm"
            }
        });

        await browser.close();

        const cpdf_path = `https://endowmentsinfo.ap.gov.in/uploads/whatsappservice/tickets/darshnam/${uniqueNumber}.pdf`;

        console.log("PDF generated successfully");
        return cpdf_path;
    } catch (error) {
        console.error("Error generating PDF:", error);

        return {
            status: 500,
            message: "Failed to generate PDF",
            error: error.message
        };
    }
};

// Seva ticket
export const generateSevaPdfTicket = async (reqId) => {
    try {
        const datetimestamp = Date.now();
        const randomNumber = Math.floor(100000 + Math.random() * 900000);
        const uniqueNumber = `${randomNumber}${datetimestamp}`;

        const dirPath = "/mnt/uploads/whatsappservice/tickets/seva";
        const filePath = path.join(dirPath, `${uniqueNumber}.pdf`);

        // ensure directory exists
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        const browser = await puppeteer.launch({
            headless: "new",
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });

        const page = await browser.newPage();

        await page.goto(`https://endowmentsinfo.ap.gov.in/phpfiles/seva.php?getvalue=${reqId}`, { waitUntil: "networkidle0" });

        await page.pdf({
            path: filePath,
            format: "A4",
            printBackground: true,
            margin: {
                top: "12mm",
                bottom: "12mm",
                left: "12mm",
                right: "12mm"
            }
        });

        await browser.close();

        const cpdf_path = `https://endowmentsinfo.ap.gov.in/uploads/whatsappservice/tickets/seva/${uniqueNumber}.pdf`;

        console.log("PDF generated successfully");
        return cpdf_path;
    } catch (error) {
        console.error("Error generating PDF:", error);

        return {
            status: 500,
            message: "Failed to generate PDF",
            error: error.message
        };
    }
};


export const generateAccommodationPdfTicket = async (reqId) => {
    try {
        const datetimestamp = Date.now();
        const randomNumber = Math.floor(100000 + Math.random() * 900000);
        const uniqueNumber = `${randomNumber}${datetimestamp}`;

        const dirPath = "/mnt/uploads/whatsappservice/tickets/accommodation";
        const filePath = path.join(dirPath, `${uniqueNumber}.pdf`);

        // ensure directory exists
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        const browser = await puppeteer.launch({
            headless: "new",
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });

        const page = await browser.newPage();

        await page.goto(`https://endowmentsinfo.ap.gov.in/phpfiles/rooms.php?getvalue=${reqId}`, { waitUntil: "networkidle0" });

        await page.pdf({
            path: filePath,
            format: "A4",
            printBackground: true,
            margin: {
                top: "12mm",
                bottom: "12mm",
                left: "12mm",
                right: "12mm"
            }
        });

        await browser.close();

        const cpdf_path = `https://endowmentsinfo.ap.gov.in/uploads/whatsappservice/tickets/accommodation/${uniqueNumber}.pdf`;

        console.log("PDF generated successfully");
        return cpdf_path;
    } catch (error) {
        console.error("Error generating PDF:", error);

        return {
            status: 500,
            message: "Failed to generate PDF",
            error: error.message
        };
    }
};

// Prasadam
export const generatePrasadamPdfTicket = async (reqId) => {
    try {
        const datetimestamp = Date.now();
        const randomNumber = Math.floor(100000 + Math.random() * 900000);
        const uniqueNumber = `${randomNumber}${datetimestamp}`;

        const dirPath = "/mnt/uploads/whatsappservice/tickets/prasadam";
        const filePath = path.join(dirPath, `${uniqueNumber}.pdf`);

        // ensure directory exists
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        const browser = await puppeteer.launch({
            headless: "new",
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });

        const page = await browser.newPage();

        await page.goto(`https://endowmentsinfo.ap.gov.in/phpfiles/prasadam.php?getvalue=${reqId}`, { waitUntil: "networkidle0" });

        await page.pdf({
            path: filePath,
            format: "A4",
            printBackground: true,
            margin: {
                top: "12mm",
                bottom: "12mm",
                left: "12mm",
                right: "12mm"
            }
        });

        await browser.close();

        const cpdf_path = `https://endowmentsinfo.ap.gov.in/uploads/whatsappservice/tickets/prasadam/${uniqueNumber}.pdf`;

        console.log("PDF generated successfully");
        return cpdf_path;
    } catch (error) {
        console.error("Error generating PDF:", error);

        return {
            status: 500,
            message: "Failed to generate PDF",
            error: error.message
        };
    }
};

//Tonsure
export const generateTonsurePdfTicket = async (reqId) => {
    try {
        const datetimestamp = Date.now();
        const randomNumber = Math.floor(100000 + Math.random() * 900000);
        const uniqueNumber = `${randomNumber}${datetimestamp}`;

        const dirPath = "/mnt/uploads/whatsappservice/tickets/tonsure";
        const filePath = path.join(dirPath, `${uniqueNumber}.pdf`);

        // ensure directory exists
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        const browser = await puppeteer.launch({
            headless: "new",
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });

        const page = await browser.newPage();

        await page.goto(`https://endowmentsinfo.ap.gov.in/phpfiles/tonsure.php?getvalue=${reqId}`, { waitUntil: "networkidle0" });

        await page.pdf({
            path: filePath,
            format: "A4",
            printBackground: true,
            margin: {
                top: "12mm",
                bottom: "12mm",
                left: "12mm",
                right: "12mm"
            }
        });

        await browser.close();

        const cpdf_path = `https://endowmentsinfo.ap.gov.in/uploads/whatsappservice/tickets/tonsure/${uniqueNumber}.pdf`;

        console.log("PDF generated successfully");
        return cpdf_path;
    } catch (error) {
        console.error("Error generating PDF:", error);

        return {
            status: 500,
            message: "Failed to generate PDF",
            error: error.message
        };
    }
};