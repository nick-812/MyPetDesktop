

const notification_btn = document.getElementById('notify');



notification_btn.addEventListener('click', async () => {
	api.notificationApi.sendNotification('My custom notification! '+localStorage.getItem("token"));

})