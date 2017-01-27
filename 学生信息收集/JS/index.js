$(function () {
	$("button").click(function() {
		let flag = true;
		$("input").each(function() {
			var $this = $(this);
			if ($this.val() === '') {
				flag = false;
			}
		});
		let _json = {};
		if (flag) {
			$("label").each(function() {
				var val = $(this).text();
				var index = $(this).index("label");
				_json[val] = $("input").eq(index).val();
			});
			$.post('/', _json, function(data, textStatus, xhr) {
				$("input").val("");
				alert("提交成功");
			});
		} else {
			alert("信息不要为空好吧！");
		}
	});
});