$( document ).ready(function()
{
    console.log( "Run index.js" );

console.log($(this))

	function createBtnMobileMenu()
	{
		if ( innerWidth < 700 && !$('.nav_header').hasClass('mobile_menu') )
	    {
	    	var $div = $('<div class="btn_mobile_menu"></div>')
	       	var $p = $('<p>Do you want to know more?</p>')

       		$div.append($p)
    		$('.nav_header').addClass('mobile_menu').find('ul').eq(0).before($div)
    		$('.btn_mobile_menu').on('click', showHideMobileMenu)

    		$('.nav_header').children('ul').children('li').hover(
    		function()
    		{
    			$(this).removeClass('active')
    		},
    		function()
    		{

    		})

    		$('.nav_header').children('ul').children('li').on('click', function()
    		{
    			var subMenu = $(this).children('ul')
    			var activeSubmenu = $('.mobile_submenu')
    		
    			if ( subMenu.length )
    			{
    				if ( !subMenu.hasClass('mobile_submenu') )
    				{
    					if ( activeSubmenu.length )
    					{
    						activeSubmenu.slideUp(500, function()
							{
								console.log('я тута')
								activeSubmenu.attr('style', '').removeClass('mobile_submenu')		
							})
    					}
    					
    					subMenu.addClass('mobile_submenu').slideDown(500)	
    				}
    				else
    				{
    					subMenu.slideUp(500, function()
    					{

    						console.log('sdf')
    						subMenu.attr('style', '').removeClass('mobile_submenu')		
    					})
    				}
    			}

    			event.preventDefault()
    		})
	    }
	    else if ( innerWidth > 700 && $('.nav_header').hasClass('mobile_menu') )
	    {
	    	$('.btn_mobile_menu').remove()
	    	$('.nav_header').removeClass('mobile_menu')
	    	$('.mobile_submenu').attr('style', '').removeClass('mobile_submenu')
	    	showHideMobileMenu()
	    	hoverMenuHeader()
	    	$('.nav_header').children('ul').children('li').off('click')
	    }
	}

	function showHideMobileMenu()
	{
		var heightMobileMenu = 0
	   	var mobileMenu = $('.nav_header').find('ul').eq(0)

       	if ( !$(this).hasClass('btn_mobile_menu') )
    	{
    		mobileMenu.removeClass('active_mobile_menu').attr('style', '')
    		return
    	}

    	if ( !mobileMenu.hasClass('active_mobile_menu') )
    	{	
    		heightMobileMenu  = mobileMenu.css('opacity', '0').addClass('active_mobile_menu').height()

    		mobileMenu.height('0').animate
    		(
	    		{
	    			opacity: 1,
	    			height: heightMobileMenu + 'px'
	    		},
	    		500,
	    		function()
	    		{
	    			$(this).attr('style', '')

	    			$('body').on('click', function(event)
			       	{
			       		if ( !$(event.target).parent().hasClass('btn_mobile_menu') && $(event.target).parents().hasClass('mobile_menu')  )
			       			return

			       		$('body').off('click')

			       		if ( $(event.target).parent().hasClass('btn_mobile_menu') )
			       			return

			       		mobileMenu.removeClass('active_mobile_menu').attr('style', '')
			       	})

	    		}
	    	)

	    	
    	}
       	else
       	{
       		mobileMenu.animate
    		(
	    		{
	    			opacity: 0,
	    			height: 0
	    		},
	    		500,
	    		function()
	    		{
	       			$(this).removeClass('active_mobile_menu').attr('style', '')
	    		}
	    	)

	    	
       	}

       	
	}

	function hoverMenuHeader()
	{
		$('.nav_header').children('ul').children('li').hover(function()
	    {
	    	if ( $(this).find('ul').length )
	    	{
	    		$(this).find('ul').hover
	    		(
	    			function()
	    			{
	    				if (innerWidth >= 700 )
	    					$(this).parent().addClass('active')
	    			},
	    			function()
	    			{
	    	
	    			}
	    		)
	    	}

	    	$(this).addClass('active')
	   	}, 
	   	function(e)
	   	{
	   		$(this).removeClass('active')	
	   	})
	}
   
    hoverMenuHeader()
    createBtnMobileMenu()
	
    $(window).resize(createBtnMobileMenu)

    
});
