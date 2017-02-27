//ф-ция слайдера
	function slideFide( currentFigure )
	{
		if ( currentFigure.next().length )
		{
			currentFigure.delay(500).fadeOut(5000, function()
			{
				$(this).css(
					{
						display: 'none',
						position: 'absolute'	
					})
			})
			.next().delay(500).fadeIn(5000, function()
			{
				$(this).css('position', 'static')
				slideFide($(this))
			})	
		}
		else
		{
			currentFigure.delay(500).fadeOut(5000, function()
			{
				$(this).css(
					{
						display: 'none',
						position: 'absolute'	
					})
			})
			.parent().find('figure').eq(0).delay(500).fadeIn(5000, function()
			{
				$(this).css('position', 'static')
				slideFide($(this))
			})	
		}
	}
	
// Запуск слайде с первого блока, блок можно менять
	slideFide( $('figure').eq(0) )
