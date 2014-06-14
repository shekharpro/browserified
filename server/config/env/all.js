'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../../..');
console.log('root path is ' + rootPath);

module.exports = {
    root: rootPath,
    port: process.env.PORT || 3000,
    simplyHiredUrl: 'http://api.simplyhired.co.in/a/jobs-api/xml-v2/',
    mongo: {
        options: {
            db: {
                safe: true
            }
        }
    },
    catchup: {
        to: "<%=to%>",
        from: "info@letscatchup.net",
        subject: "Let's catchup",
        replyto: "",
        toname: "<%=toname%>",
        fromname: "Catchup Admin",
        text: "Dear <%=name%>, I’d like to cathup with you.We both belong to the same alma mater.Best regards <%=fromname%>",
        html: "<br><br>Dear <%=name%>,<br><br>I’d like to cathup with you.We both belong to the same alma mater.<br><br> Best regards<br> <%=fromname%>"
    },
    requestref: {
        to: "<%=to%>",
        from: "info@letscatchup.net",
        subject: "Referral request for",
        replyto: "",
        toname: "<%=toname%>",
        fromname: "Catchup Admin",
        text: "Dear <%=name%>, <br><br> <%=message%>.<br><br>  Best regards <%=fromname%>",
        html: "<br><br>Dear <%=name%>,<br><br> <%=message%>.<br><br> Best regards<br> <%=fromname%>"
    },
    userActivation: {
        to: "<%=to%>",
        from: "info@letscatchup.net",
        subject: "lets CATCHUP!",
        replyto: "",
        toname: "<%=toname%>",
        fromname: "Team CATCHUP.",
        text: "Congratulations <%=name%>, You are now ready to CATCHUP! Please Click on the link <%=actUrl%> to activate your account and login to find referral jobs. Follow three simple steps to unlock endless professional opportunities: 1. Add skills to complete your profile.2. Invite more friends to grow your referral network. 3. Find over 100,000 referral jobs from around the world. We are happy to have you here. For any other queries or help, feel free to write to us at info@letscatchup.net and our support team will get back to you in no time. Good Luck. Team CATCHUP",
        html: "<br>Congratulations <%=name%>, <br><br>You are now ready to CATCHUP! <br>Please <a href='<%=actUrl%>' target='_blank'>Click Here</a> to activate your account and login to find referral jobs. <br><br>Follow three simple steps to unlock endless professional opportunities: <br>1. Add skills to complete your profile. <br>2. Invite more friends to grow your referral network. <br>3. Find over 100,000 referral jobs from around the world.<br> <br>We are happy to have you here. For any other queries or help, feel free to write to us at info@letscatchup.net and our support team will get back to you in no time. <br><br>Good Luck. <br>Team CATCHUP"
    },
    forgotPassword: {
        to: "<%=to%>",
        from: "info@letscatchup.net",
        subject: "Forgot Password: CATCHUP",
        replyto: "",
        toname: "<%=toname%>",
        fromname: "Catchup Admin",
        text: "Hello<%=name%>, We have reset your password as per your request. You new password is: <%=password%> Click on the link <%=actUrl%> to login again. To change it again as per your preference, go to settings and change password. Hope this helps! Lets CATCHUP.",
        html: "<br><br>Hello <%=name%>,<br><br> We have reset your password as per your request.<br> You new password is: <%=password%> <br> <a href='<%=actUrl%>' target='_blank'>Click Here</a>. <br><br>To change it again as per your preference, go to settings and change password.<br> Hope this helps! <br><br> Lets CATCHUP."
    },
    jobNotification: {
        to: "<%=to%>",
        from: "info@letscatchup.net",
        subject: "New Jobs for You",
        replyto: "",
        toname: "<%=toname%>",
        fromname: "Catchup Admin",
        text: "Hello <%=name%>, There are more jobs matching your profile. Click on the link <%=actUrl%> to CATCHUP with latest job opportunities. Follow three simple steps to unlock more professional opportunities: 1. Add skills to complete your profile. 2. Invite more friends to grow your referral network. 3. Find over 100,000 referral jobs from around the world. Good Luck Team CATCHUP",
        html: "<br><br>Hello <%=name%>, <br><br>There are more jobs matching your profile. <a href='<%=actUrl%>' target='_blank'>Click Here</a> to CATCHUP with latest job opportunities.<br><br> Follow three simple steps to unlock more professional opportunities:<br><br> 1. Add skills to complete your profile.<br> 2. Invite more friends to grow your referral network.<br> 3. Find over 100,000 referral jobs from around the world.<br><br> Good Luck <br><br> Team CATCHUP"
    },
    incompleteProfile: {
        to: "<%=to%>",
        from: "info@letscatchup.net",
        subject: "Job Enquiry",
        replyto: "",
        toname: "<%=toname%>",
        fromname: "Catchup Admin",
        text: "Hello <%=name%>, Your profile was viewed (Random number under 20) times last week. Please add skills and complete your profile to get better job offers. People with updated skills have 100% more chances to get noticed and hired. Click on the link <%=actUrl%> to update your profile now. Good Luck Team CATCHUP",
        html: "<br><br>Hello <%=name%>,<br><br> Your profile was viewed (Random number under 20) times last week. Please add skills and complete your profile to get better job offers.<br><br> People with updated skills have 100% more chances to get noticed and hired.<br> <a href='<%=actUrl%>' target='_blank'>Click Here</a> to update your profile now.<br><br> Good Luck<br><br> Team CATCHUP"
    },
    genricNotification: {
        to: "",
        from: "",
        subject: "",
        replyto: "",
        toname: "",
        fromname: "",
        text: "",
        html: ""
    },
    invitationContent: {
        to: "<%=to%>",
        from: "info@letscatchup.net",
        subject: "Subject: Lets CATCHUP! ",
        replyto: "",
        toname: "<%=toname%>",
        fromname: "",
        text: "Hello, Hope you are doing great! I am using this amazing platform to find referral jobs. Thought it would be of great use to you too.  Do check it out: http://letscatchup.net/ Lets CATCHUP!  <%=sender%>",
        html: "<br>Hello,<br><br>Hope you are doing great!<br><br>I am using this amazing platform to find referral jobs.<br>Thought it would be of great use to you too.<br>Do check it out: http://letscatchup.net/<br><br>Lets CATCHUP!<br><br> <%=sender%>"
    }
};
