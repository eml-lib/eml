```
padding="10px, 240w: 0"
// all: 10px
// 240w: 0
padding="10px (20px, 340w: 0)"
// all: 10px 20px 
// 340w: 10px 0
background="red url('../img.jpg')"
// all: red
padding="10px [20px, 340w: 0]"
padding="10px [20px, 340w: 0] 20px 30px"
sizes(240w 20px, 0)
[240w 20px, 0]
// 




padding="[20px, 240w 10px]"
padding="20px [10px, (max-width: 600px) 0] 30px 0"
mobile-padding="20px"


background="red [url('../img.jpg'), (max-width: 600px) url('...')]"


background="red device(url('...'), (max-width: 600px) url('...'))"

padding="10px screen(10px, (max-width: 600px) 0)"




px				[0-9]+px
function		[Aa-Zz]+{openParenthesis}





```

