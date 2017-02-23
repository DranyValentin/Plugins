	var $mobileMenu = document.querySelector('.mobile_menu')
	var $headerNav = document.querySelector('.header_nav')
	var currentPosYNav = ($headerNav.getBoundingClientRect().top > 0) ? $headerNav.getBoundingClientRect().top : 75
	var $btnPhone = document.querySelector('.btnPhone')
	var $btnImmediateNeed = document.querySelector('.btnImmediateNeed')

	function hideNavMenu(event)
	{
		document.body.style.overflow = ''

		var $headerNav = document.querySelector('.header_nav')
			$headerNav.classList.remove('mask')

		$headerNav.firstElementChild.nextElementSibling.classList.remove('show_mobile_menu')

		if ( $headerNav.lastElementChild.firstElementChild.tagName == 'A' )
			$headerNav.lastElementChild.removeChild($headerNav.lastElementChild.firstElementChild)
		if ( $headerNav.lastElementChild.firstElementChild.tagName == 'A' )
			$headerNav.lastElementChild.removeChild($headerNav.lastElementChild.firstElementChild)

		$headerNav.removeEventListener('click', hideNavMenu, false)
	}

	var url = ''
	function addMainLogo()
	{
		var $a = document.createElement('a')
			$a.href = '/'
			$a.title = 'Main Page'
		var $img = document.createElement('img')
			$img.alt = 'Logo company Brunswick Memorial'
		var $wrHeader = document.querySelector('.wr_header')

		if ( !url )
		{
			var xhr = new XMLHttpRequest()
			var fd = new FormData()

			xhr.open('POST', ajax_message_object.ajaxurl)

			fd.append('action', 'ajaxmainurlquestion')

			xhr.send(fd)

			xhr.onreadystatechange = function()
			{
				if ( this.readyState == this.DONE)
				{
					url = this.responseText.replace(/[\\\"]/g, '')
					$img.src = url + '/imgs/Logo_small.png'
				}
			}	
		}
		else
			$img.src = url + '/imgs/logo_small.png'
						
		
		$wrHeader.firstElementChild.setAttribute('style', '')
	
		$a.appendChild($img)
		$wrHeader.insertBefore($a, $wrHeader.firstElementChild)
	}

	function removeMainLogo()
	{
		var $wrHeader = document.querySelector('.wr_header')

		if ($wrHeader.firstElementChild.tagName == "A")
		{
			$wrHeader.removeChild($wrHeader.firstElementChild)
			$wrHeader.firstElementChild.setAttribute('style', 'width: 100%;')
		}

	}

	$mobileMenu.addEventListener('click', function(event)
	{
		this.nextElementSibling.classList.add('show_mobile_menu')
		this.parentNode.classList.add('mask')
		document.body.style.overflow = 'hidden'

		this.nextElementSibling.insertBefore($btnPhone.cloneNode(true), this.nextElementSibling.firstElementChild )
		this.nextElementSibling.insertBefore($btnImmediateNeed.cloneNode(true), this.nextElementSibling.firstElementChild )	

		var $mask = document.querySelector('.mask')
		
		event.stopPropagation()
		$mask.addEventListener('click', hideNavMenu, false)
	}, false)

	window.addEventListener('scroll', function()
	{
		if ( $headerNav.getBoundingClientRect().top < 0 && !$headerNav.classList.contains('fixed_nav_menu') )
		{
			$headerNav.classList.add('fixed_nav_menu')
		}
		else if ( this.pageYOffset < currentPosYNav && $headerNav.classList.contains('fixed_nav_menu') )
		{
			$headerNav.classList.remove('fixed_nav_menu')		
		}
	}, false)

	// Open subMenu
		var $topLevelMenu = document.querySelector('.top_level_menu')

		
		var currentMenu = null
		var $curUl, $curAnimUl
		var clearTopMenuClass = true
		var requestAnimationFrameMenuTop

		function showMenuMouseMove(event)
		{
			if ( currentMenu )
				return

			var target = event.target

			while ( target != this )
			{
				if ( target.tagName == 'LI' )
					break

				target = target.parentNode
			}

			if ( target == this )
				return

			currentMenu = target

			var $ul = target.lastElementChild.tagName == 'UL' ? target.lastElementChild : null

			if ( $ul )
			{
				if ($ul.classList.contains('moveSubmenu'))
				{
					clearTopMenuClass = true

					$ul.classList.remove('showSubmenu')
					$ul.classList.remove('moveSubmenu')
				}

				$ul.classList.add('showSubmenu')
			}

			event.stopPropagation()
		}

		function hideMenuMouseMove(event)
		{
			if ( !currentMenu )
				return

			var relatedTarget = event.relatedTarget

			if ( relatedTarget )
			{
				while ( relatedTarget )
				{
					if ( relatedTarget == currentMenu )
						return

					relatedTarget = relatedTarget.parentNode
				}
			}

			$curUl = currentMenu.lastElementChild.tagName == 'UL' ? currentMenu.lastElementChild : null

			if ( $curUl )
			{
				$curAnimUl = $curUl
				$('.moveSubmenu').removeClass('moveSubmenu showSubmenu')
				$curAnimUl.classList.add('moveSubmenu')
				clearTopMenuClass = false
		
				requestAnimationFrameMenuTop = requestAnimationFrame(doAnimMoveMenu)
			}
			
			currentMenu = null

			event.stopPropagation()
		}

		function showMenuClick(event)
		{
			var target = event.target

			while ( target != this )
			{
				if ( target.tagName == 'LI' )
					break

				target = target.parentNode
			}

			if ( target == this )
				return

			currentMenu = target

			var $subMenu = target.lastElementChild
			if ( $subMenu )
			{
				if ( !$subMenu.classList.contains('showSubmenu') )
				{
					$('.showSubmenu').slideUp(1000, function()
					{
						$(this).attr('style', "display: ''")
										.removeClass('showSubmenu').prev()
										.removeClass('glyphicon-menu-up')
										.addClass('glyphicon-menu-down')
					})
					$($subMenu).slideDown(1000)

					$subMenu.classList.add('showSubmenu')
					$subMenu.previousElementSibling.classList.remove('glyphicon-menu-down')
					$subMenu.previousElementSibling.classList.add('glyphicon-menu-up')
				}
				else
				{
					$($subMenu).slideUp(function(){$($subMenu).attr('style', "display: ''")})
					
					$subMenu.classList.remove('showSubmenu')
					$subMenu.previousElementSibling.classList.remove('glyphicon-menu-up')
					$subMenu.previousElementSibling.classList.add('glyphicon-menu-down')
				}
			}

			event.stopPropagation()
			event.preventDefault()
		}	

		function doAnimMoveMenu()
		{
			if ( clearTopMenuClass )
			{
				console.log('Я в первом ифе')
				cancelAnimationFrame(requestAnimationFrameMenuTop)
				return
			}
			else if ( getComputedStyle($curAnimUl).opacity <= 0 )
			{
				$('.moveSubmenu').removeClass('moveSubmenu showSubmenu')

				cancelAnimationFrame(requestAnimationFrameMenuTop)
				return
			}

			requestAnimationFrameMenuTop = requestAnimationFrame(doAnimMoveMenu)
		}
	// End Open SubMenu

	var bigWindowRun

	if ( innerWidth > 798 )
		bigWindowRun = true
	else
		bigWindowRun = false

	var $lisMenu = $topLevelMenu.querySelectorAll('li')
	var $lisMenuLength = $lisMenu.length

	function rebuildMenuResize()
	{
		if ( innerWidth > 798 && bigWindowRun )
		{

			$topLevelMenu.removeEventListener('click', showMenuClick, false)
			$topLevelMenu.addEventListener('mouseover', showMenuMouseMove, false)
			$topLevelMenu.addEventListener('mouseout', hideMenuMouseMove, false)
			bigWindowRun = false

			hideNavMenu()

			if ( location.pathname == '/' && $headerNav.parentNode.firstElementChild.tagName == 'A' )
				removeMainLogo()

			

			for ( var i = 0; i < $lisMenuLength; i++ )
			{
				var $spanLi = $lisMenu[i].querySelector('span')
				if ( $spanLi )
					$lisMenu[i].removeChild($spanLi)

				var $ulLi = $lisMenu[i].querySelector('.showSubmenu')
				if ( $ulLi )
				{
					$ulLi.setAttribute('style', 'display: ""')
				 	$ulLi.classList.remove('showSubmenu')
				}
			}
		}
		else if ( innerWidth <= 798 && !bigWindowRun )
		{
			bigWindowRun = true	
			$topLevelMenu.removeEventListener('mouseover', showMenuMouseMove, false)
			$topLevelMenu.removeEventListener('mouseout', hideMenuMouseMove, false)		
			
			var $span = document.createElement('span')
				$span.className = 'glyphicon glyphicon-menu-down icon_menu_down'
				$span.setAttribute('aria-hidden', 'true')

			for ( var i = 0; i < $lisMenuLength; i++ )
			{
				var $ul = $lisMenu[i].querySelector('ul')
				if ( $ul )
				{
					$lisMenu[i].insertBefore($span.cloneNode(), $ul)

					if ( $ul.classList.contains('moveSubmenu') )
					{
						clearTopMenuClass = true
						$ul.classList.remove('moveSubmenu')
						$ul.classList.remove('showSubmenu')
					}
				}
			}

			if ( location.pathname == '/' )
				addMainLogo()

			$topLevelMenu.addEventListener('click', showMenuClick, false)
		}
	}
	
	rebuildMenuResize()

	window.addEventListener('resize', function (event)
	{
		rebuildMenuResize()
	}, false)
