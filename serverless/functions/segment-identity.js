const axios = require('axios');
const Analytics = require('analytics-node');
const { promisify } = require('util');

exports.handler = async function (context, event, callback) {
  console.log(`Inside segment create customer or add enquired product to segment`)
  const analytics = new Analytics(context.SEGMENT_WRITE_KEY, { flushAt: 1, flushed: true });
  const [identify, track] = [analytics.identify.bind(analytics), analytics.track.bind(analytics)].map(promisify);

  const phone = event.phone;
  const url = `https://profiles.segment.com/v1/spaces/spa_uwshvtmhCaJ3UeTjitrSJB/collections/users/profiles/mobileno:${phone}/traits?limit=200`;

  const uname = context.SEGMENT_ACCESS_SECRET;
  const pass = '';

  /**
   * Get the details from segment we need to get the enquired product first 
   * then add the new product 
   * 
   */

  try {
    var res;
    var newCustomer = false;
    try {

      res = await axios({
        method: "get",
        url: url,
        auth: {
          username: uname,
          password: pass
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(`Initiated Segment Call to URL :-  ${url} Response Received :- ${JSON.stringify(res.data)}`);
    } catch (error) {
      newCustomer = true;
      console.log(`User not found in segment for ${phone} new user will be added into segment error ${error.message}`);
    }


    var enquiredProducts = (res && res.data && res.data.traits.enquiredProducts) ? res.data.traits.enquiredProducts : [];
    console.log(`Got the number enquired products :- ${enquiredProducts.length}`);

    /**
     * Adding the new product to the existing list
     */

    var newlyEnquiredPdt = {
      "enquiredDate": event.enquiredDate,
      "productImageUrl": event.productImageUrl,
      "productName": event.productName,
      "productSku": event.productSku,
      "timeSpend": event.timeSpend
    }
    enquiredProducts.push(newlyEnquiredPdt);
    console.log(`Final set of products :- ${enquiredProducts.length} Pushing data to segment`);

    var traits;
    if (newCustomer) {
      /**
       * Split the full name and make the first name and last name
       * 
      */
      const spittedData = event.name.split(' ');
      const firstName = spittedData[0];
      var lastName = "";
      for (index = 1; index < spittedData.length; index++) {
        lastName = lastName + " " + spittedData[index];
      }

      traits = {
        "mobileno": phone,
        "email": event.email,
        "name": event.name,
        "customerInfo": {
          "firstName": firstName,
          "lastName": lastName,
          "email": event.email,
          "mobileno": phone
        },
        enquiredProducts
      }

    } else {
      traits = {
        "mobileno": phone,
        enquiredProducts
      }
    }

    /**
     * Push the latest data back to segment
     * 
     */

    await identify({
      userId: phone,
      traits: traits
    });
    console.log(`Data successfully pushed to segment`);

    return callback(null, buildResponse(true, '', phone, res));
  } catch (e) {
    console.log('Error Occured :- ', e);
    return callback(null, buildResponse(true, '', phone, res));
  }
};

function buildResponse(success, message, phone, res) {
  const response = new Twilio.Response();
  if (success) {
    response.setStatusCode(200);
    response.setBody(res ? res.data : `Segment Data is not real time please use 
https://functions-salesforce-9513-dev.twil.io/segment?phone=${phone} to query latest data`);
  } else {
    response.setStatusCode(403);
    response.setBody(message);
  }
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  response.appendHeader("Content-Type", "application/json");
  return response;
}