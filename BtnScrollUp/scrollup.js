(function()
{
	// Button Scroll Screen Top
	var $btnUp = document.querySelector('.btn_up')
	var initialScrollY = window.pageYOffset
	var initialOpacity = 0
	var currentScrollY = initialScrollY
	var currentOpacity = initialOpacity
	var speedAnimScrollY = 250
	var speedAnimOpacity = 0.05
	var requestAnimationFrameScrollY
	var requestAnimationFrameOpacity
	var keyAnimScrollY = false
	var keyOpacity = true

	//Function Show or Hide ButtonUp
		function btnUpShowHide()
		{
			// if ( $btnUp.style.position == 'fixed' )
			// 	return

			if ((window.innerHeight/2) < window.pageYOffset )
			{
				if (currentOpacity < 1)
				{
					keyOpacity =true
					$btnUp.style.position = 'fixed'
					$btnUp.style.display = 'block'
					requestAnimationFrameOpacity = requestAnimationFrame(animBtnOpacity)
				}
				else
				{
					keyOpacity = false
				}
			}
			else if (currentOpacity <= 0)
			{	
				keyOpacity = true
				$btnUp.style.position = ''
				$btnUp.style.display = ''
			}
			else if (currentOpacity >= 1)
			{
				keyOpacity = false
				requestAnimationFrameOpacity = requestAnimationFrame(animBtnOpacity)
			}
		}

	//Function Animate Button Opacity
		function animBtnOpacity()
		{
			$btnUp.style.opacity = currentOpacity

			if ( currentOpacity > 1 || currentOpacity < 0 )
			{
				if (currentOpacity > 1)
					currentOpacity = 1
				else 
				{
					currentOpacity = 0
					$btnUp.style.position = ''
					$btnUp.style.display = ''
				}
				cancelAnimationFrame(requestAnimationFrameOpacity)
		    	return
			}

			if (keyOpacity)
				currentOpacity += speedAnimOpacity
			else
				currentOpacity -= speedAnimOpacity

			requestAnimationFrameOpacity = requestAnimationFrame(animBtnOpacity)
		}
	
	//Function Animate Scroll Page on Top
		function animScrollPage()
		{
			window.scrollTo(0, currentScrollY)

			if ( currentScrollY <= 0 )
			{
				cancelAnimationFrame(requestAnimationFrameScrollY)
		    	return
			}

			currentScrollY -= speedAnimScrollY

			requestAnimationFrameScrollY = requestAnimationFrame(animScrollPage)
		}

	btnUpShowHide()

	window.addEventListener('resize', function()
	{
		btnUpShowHide()	
	})

	window.addEventListener('scroll', function()
	{
		currentScrollY = window.pageYOffset
		btnUpShowHide()
	})

	$btnUp.addEventListener('click', function()
	{
		keyAnimScrollY = true
		requestAnimationFrameScrollY = requestAnimationFrame(animScrollPage)
	})

	document.body.addEventListener('wheel', function(event)
	{
		if ( keyAnimScrollY )
		{
			keyAnimScrollY = false
			cancelAnimationFrame(requestAnimationFrameScrollY)
		}
	})
// End Button Scroll Screen Top
})()

