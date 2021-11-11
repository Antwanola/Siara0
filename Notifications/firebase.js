const admin = require("firebase-admin")
const serviceAccount = require("../Notifications/privateKey.json");

module.exports =()=> {
  // const message = {
  //   notification:{
  //     title:"",
  //     message:""
  //   },
  //   token:{
      
  //   }
  // }
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://vue-first-deploy-test.firebaseio.com"
      });
    
    console.info("Initialized Firebase SDK");


   sendNotification = (message)=>{
    
    admin.messaging().sendToTopic("/topic/", message)
    .then(function(response) {
      console.log("Successfully sent message:", response);
    })
    .catch(function(error) {
      console.log("Error sending message:", error);
    });
   }
}
