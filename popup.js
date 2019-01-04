

$(function(){

	chrome.storage.sync.get('total', function(budget){
		$('.total').text(budget.total);
		newt=parseInt(budget.total);
		chrome.storage.sync.get('limit', function(max){
			$('.limit').text(max.limit);
			if(newt>max.limit){
				var text="limit exceed";
				$('.error').text(text);
			}
			if(newt==max.limit)
				{
					var text="limit reached";
					$('.error').text(text);
				}
		});
	});




	$('.submit').click(function(){
		chrome.storage.sync.get('total', function(budget){
			var newtotal=0;
			var message='';
			if(parseInt(budget.total)){
				newtotal+=parseInt(budget.total);
			}

			var amount=$('.amount').val();

			if(amount){
				newtotal+=parseInt(amount);
			}

			chrome.storage.sync.set({'total': newtotal});

			chrome.storage.sync.get('limit', function(max){
				if(newtotal>max.limit)
					{
						var text="limit exceed";
						$('.error').text(text);
					}
				if(newtotal==max.limit)
					{
						var text="limit reached";
						$('.error').text(text);
					}
			});

			$('.total').text(newtotal);
			$('.amount').val('');
		});
	});

	$('.clear').click(function(){
		chrome.storage.sync.get('total', function(budget){
			var newy=0;
			chrome.storage.sync.set({'total': newy});
			$('.total').text(newy);
			$('.error').text('null');
		});
	});

	$('.setlimit').click(function(){
		chrome.storage.sync.get('limit', function(max){
			var lt=$('.limits').val();
			chrome.storage.sync.set({'limit': lt});
			$('.limit').text(lt);
			chrome.storage.sync.get('total', function(budget){
				if(budget.total>lt)
					$('.error').text('limit exceeded');
				if(budget.total==lt)
					$('.error').text('limit reached');
				if(budget.total<lt)
					$('.error').text('null');
				$('.limits').val('');
			});
		});
	});

});