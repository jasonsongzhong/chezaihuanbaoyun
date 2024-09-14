import Vue from 'vue'
Vue.filter('formatDate', function(time) {
	var re = /-?\d+/;
	var m = re.exec(time);
	var d = new Date(parseInt(m[0]));
	var o = {
		"M+": d.getMonth() + 1, //month
		"d+": d.getDate(), //day
		"h+": d.getHours(), //hour
		"m+": d.getMinutes(), //minute
		"s+": d.getSeconds(), //second
		"q+": Math.floor((d.getMonth() + 3) / 3), //quarter
		"S": d.getMilliseconds() //millisecond
	}
	var format = "yyyy-MM-dd hh:mm:ss";
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
});
Vue.filter('yinzi2', function(value) {
	const options = {
		'i33101': '温度'
	}
	return option[value]
});
