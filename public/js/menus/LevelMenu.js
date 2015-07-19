function LevelMenu(levels) {
	
	//font, size and alignment for the buttons
	var titleStyle = {font:"60px GoodDog", fill: "#f70", align: "center"};
	var defStyle = {font:"40px GoodDog", fill: "darkgray", align: "center"};
	var hoverStyle = {font:"60px GoodDog", fill: "black", align: "center"};
	var searchStyle = {font:"30px Arial", fill: "black", align: "left"};

	
	// populates the page with text title text
	this.buttons = {
		title: { 
			offset_x: 0, offset_y: 0, isLink: false, tObj: null,
			styles: {
				fnt_def: titleStyle, fnt_hover: titleStyle
			}, 
			text: "Camper Survival", callback: function(){
				
			}
		}
	};
	
	//sets all buttons with same style attributes
	var style = {
		fnt_def: defStyle, 
		fnt_hover: hoverStyle
	};
	
	//populates page with level buttons
	var z = '0';
	for(var i = 150; i < 251; i = i + 100){
		for(var j = -200; j < 201; j = j + 200){
			var fName = levels[z];
			if(fName != null) {
				var split = levels[z].split('_');
				if((Number(split[1]))!= null || typeof (Number(split[1])) != int) {
					var file = fName
				}else {
					var file = split[0] + '_' + (Number(split[1]) + 1);
				}
			};
			
			this.buttons[levels[z]] = {
				offset_x: j,
				offset_y: i,
				styles: style,
				text: file,
				image: 'assets/level_images/' + fName +
					'.png',
				callback: function(fName){
					game.state.add(fName.text, new Level(fName.text));
					game.state.start(fName.text);
				}
			}
			z++;
		};
	};
}

//prototype
LevelMenu.prototype = {
	preload: function () {
		var self = this;
		
		// load the images here
		$.each(this.buttons, function(i, e) {
			game.load.image(e.text, e.image);
		});
	},
	create: function() {
		
		var self = this;
		
		game.stage.backgroundColor = "#DFE"; // ah that worked :p
		
		//button rendering
		var leftOffset = (game.width / 2);
		var topOffset = game.height / 8.0;
		
		$.each(this.buttons, function(i, e){
			
			if (e.image !== undefined) {
				game.add.image(leftOffset + (Number(e.offset_x) - 30), topOffset + (Number(e.offset_y) - 40), e.text);
			}
			
			e.tObj = game.add.text(leftOffset + e.offset_x, topOffset + e.offset_y, e.text, e.styles.up);
			
			e.tObj.anchor.set(0.5);
			
			e.tObj.inputEnabled = true;
			
			e.tObj.events.onInputDown.add(e.callback, self);
			
			e.tObj.events.onInputOver.add(function(){
				e.tObj.setStyle(e.styles.fnt_hover);
				if(e.isLink) {
					game.canvas.style.cursor = "pointer";
				} else {
					game.canvas.style.cursor = "default";
				}
			}, self);
			
			e.tObj.events.onInputOut.add(function(){
				e.tObj.setStyle(e.styles.fnt_def);
				game.canvas.style.cursor = "default";
			}, self);
			
		});
		
		window.setTimeout(function(){
			$.each(self.buttons, function(i, e){
				e.tObj.setStyle(e.styles.fnt_def);
			});
		}, 10);
	}
};