const sendSms = (mobile, otp, msg) => {
  const http = require("https");

  const options = {
    method: "POST",
    hostname: "api.msg91.com",
    port: null,
    path: "/api/v5/flow/",
    headers: {
      authkey: "293235AXhyyGJC63be5b10P1",
      "content-type": "application/json",
    },
  };

  const req = http.request(options, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });

  req.write(
    `{\n  "flow_id": "63bc029a28949f0a2c471ee5",\n  "mobiles": 91${mobile},\n  "amount": "1200",\n  "receipt": "https://xhitiz.com/12312345",\n  "date": "12/01/2023"\n}`
  );
  req.end();
};


sendSms('6232100854')
module.exports = sendSms;
