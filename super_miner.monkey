'Set Strict Mode
Strict

'Import Modules
Import mojo 'Mojo - graphics module
Import autofit 'Autofit - virtual resolution module

'Android Globals
#If TARGET="android"

	'Force landscape mode on android
	#ANDROID_SCREEN_ORIENTATION="landscape"
	
#Endif

'Main Function
Function Main:Int()
	New Game
	Return 0
End Function

'Map/Level Globals
Global mapList:StringMap<brick>
Global offsetX:Float 'Drawing X Location Offset
Global offsetY:Float 'Drawing Y Location Offset
Global zoom:Int = 1 'Zoom level
Global buildMode:Bool = False 'In Build Mode or Not
Global lastBuildModeHit:Int = 0 'Previous Build Mode Press
Global selectedBrick:Int = 0 'Currently selected brick for build mode

'Game Class
Class Game Extends App
	
	'Player Fields
	Field player:player
	
	'Media Fields
	Field img_dirtBrick:Image
	Field img_stoneBrick:Image
	Field img_grassBrick:Image
	Field img_coalBrick:Image
	Field img_silverBrick:Image
	Field img_goldBrick:Image
	Field img_destroyedBrick:Image
	Field img_player:Image
	Field img_pickaxe:Image
	Field img_sky:Image
	Field img_dpad:Image
	Field img_bModeEnabled:Image
	Field img_bModeDisabled:Image
	Field img_button:Image
	
	'This method is run when the game is first started
	Method OnCreate:Int()
	
		'Set update rate to 60
		SetUpdateRate(60)
		
		'Resolution Settings
		SetVirtualDisplay(800, 480)
		
		'Set Player Settings
		player = New player(384.0, 192.0)
		
		'Set Level Settings
		mapList = New StringMap<brick>
		offsetX = 0.0
		offsetY = 0.0
		
		'Load Images
		img_dirtBrick = LoadImage("Media/Graphics/Bricks/dirt.png")
		img_stoneBrick = LoadImage("Media/Graphics/Bricks/stone.png")
		img_grassBrick = LoadImage("Media/Graphics/Bricks/grass.png")
		img_coalBrick = LoadImage("Media/Graphics/Bricks/coal.png")
		img_silverBrick = LoadImage("Media/Graphics/Bricks/silver.png")
		img_goldBrick = LoadImage("Media/Graphics/Bricks/gold.png")
		img_destroyedBrick = LoadImage("Media/Graphics/Bricks/destroyed.png")
		img_player = LoadImage("Media/Graphics/Player/player.png")
		img_pickaxe = LoadImage("Media/Graphics/Items/pickaxe.png")
		img_sky = LoadImage("Media/Graphics/Backgrounds/Sky.png")
		img_dpad = LoadImage("Media/Graphics/GUI/D-Pad.png")
		img_bModeEnabled = LoadImage("Media/Graphics/GUI/BuildMode_Selected.png")
		img_bModeDisabled = LoadImage("Media/Graphics/GUI/BuildMode_Deselected.png")
		img_button = LoadImage("Media/Graphics/GUI/Button.png")
		
		'Randomly Generate the map
		generateMap()
		
		'Set fog visibility
		player.Fog()
		
		'Return 0 for compatibility
		Return 0
		
	End Method
	
	'This method is run when the game is ready to update
	Method OnUpdate:Int()
		
		'Update player movement
		player.Input()
		
		'Update player
		player.Update()
	
		'Return 0 for compatibility
		Return 0
		
	End Method
	
	'This method is run when the game is ready to render
	Method OnRender:Int()
		
		'Update Display
		UpdateVirtualDisplay()
		
		'Clear current screen
		Cls(0.0, 0.0, 0.0)
		
		'Translate drawing space
		Translate(offsetX, offsetY)
		
		'Draw teh map
		drawMap()
		
		'Draw the sky
		drawSky()
		
		'Draw the player
		player.Draw(img_player, img_pickaxe)
		
		'Draw d-pad
		SetAlpha(0.35)
		DrawImage(img_dpad, ((offsetX * -1) + 10.0), ((offsetY * -1) + 260.0))
		
		'Draw Build Mode
		If buildMode = True
			SetAlpha(1.0)
			'Draw grid lines
			For Local fx:Int = 0 To 13
				DrawRect ((offsetX * -1) + (fx * 64)), (offsetY * -1), 1, (8 * 64)
				If (fx < 8)
					DrawRect (offsetX * -1), ((offsetY * -1) + (fx * 64)), (13 * 64), 1
				EndIf
			Next
			DrawImage(img_button, ((offsetX * -1) + 505.0), ((offsetY * -1) + 377.0))
			DrawImage(img_bModeEnabled, ((offsetX * -1) + 517.0), ((offsetY * -1) + 389.0))
			DrawImage(img_button, ((offsetX * -1) + 249.0), ((offsetY * -1) + 377.0))
			If selectedBrick = 0
				DrawImage(img_dirtBrick, ((offsetX * -1) + 256.0), ((offsetY * -1) + 384.0))
			EndIf
		Elseif buildMode = False
			DrawImage(img_button, ((offsetX * -1) + 505.0), ((offsetY * -1) + 377.0))
			DrawImage(img_bModeDisabled, ((offsetX * -1) + 517.0), ((offsetY * -1) + 389.0))
		EndIf
		SetAlpha(1.0)
		
		'Return 0 for compatibility
		Return 0
		
	End Method
	
	'This method draws the map
	Method drawMap:Void()
		
		'Get inital x/y positions
		Local x:Float = (offsetX * -1)		
			'Fix for android
			#If TARGET="android"
				If x = 0.0
					x = -64.0
				Endif
			#Endif
		Local y:Float = (offsetY * -1)
		
		'While the y position is on screen, loop
		While y < ((offsetY * -1) + 512.0)
		
			'While x position is on screen, draw and loop
			While x < ((offsetX * -1) + 832.0)
			
				'Get the brick at the requested position
				Local b:brick = mapList.Get(x + "_" + y)
				
				'If a brick exists in this position
				If b <> Null
				
					'If the brick is visible
					If b.broken = False
						
						'If brick does not have fog, then draw
						If b.fog = False

							If (b.y = 256.0)
								DrawImage(img_grassBrick, b.x, b.y)
							Else
								'Draw Correct brick type
								If b.type = 0
									DrawImage(img_dirtBrick, b.x, b.y)
								Elseif b.type = 1
									DrawImage(img_coalBrick, b.x, b.y)
								Elseif b.type = 2
									DrawImage(img_silverBrick, b.x, b.y)
								Elseif b.type = 3
									DrawImage(img_goldBrick, b.x, b.y)
								Endif
							EndIf
								
						Endif
							
					'If brick has been destroyed
					Else
						
						'If brick does not have fog, then draw
						If b.fog = False
							DrawImage(img_destroyedBrick, b.x, b.y)
						Endif
							
					Endif
						
				EndIf
					
				
				'Increase x position for next brick
				x = (x + 64.0)
				
			Wend
			
			'Reset x position
			x = (offsetX * -1)
			
			'Fix for android
			#If TARGET="android"
				If x = 0.0
					x = -64.0
				Endif
			#EndIf
			
			'Increase y position for next row
			y = (y + 64.0)
			
		Wend
		
	End Method
	
	'This method draws the sky
	Method drawSky:Void()
	
		'Draw the sky
		If (player.y - offsetY) < 480.0
			DrawImage(img_sky, ((player.x - offsetX) - 384.0), -64.0)
		Endif
		
	End Method
	
End Class

'Player class
Class player

	'Player fields
	Field x:Float 'X Location
	Field y:Float 'Y Location
	Field direction:Int '0 = down, 1 = right, 2 = up, 3 = left
	Field lastInput:Int 'When the last input was entered
	Field isJumping:Bool 'If player is jumping or not
	Field jumpStart:Int 'When we started the jump
	Field isFalling:Bool 'If we fell the last update
	Field lastFall:Int 'When we last fell
	Field isMining:Bool 'If we are currently mining a block
	Field miningStart:Int 'When we started the mine
	Field miningTimer:Int 'How long to mine
	Field brickMined:brick 'The brick that is currently being mined
	Field pickaxeX:Float 'Location X of pickaxe for image
	Field pickaxeY:Float 'Location Y of pickaxe for image
	
	
	'This method creates the player
	Method New(xLoc:Float, yLoc:Float)
		Self.x = xLoc
		Self.y = yLoc
		Self.direction = 0
		Self.lastInput = 0
		Self.isJumping = False
		Self.jumpStart = 0
		Self.isFalling = False
		Self.lastFall = 0
		Self.isMining = False
		Self.miningStart = 0
		Self.miningTimer = 0
		Self.pickaxeX = 0.0
		Self.pickaxeY = 0.0
	End Method
	
	'This method gets input from user to control player
	Method Input:Void()
		
		'Check to see if we can enter input
		If (Millisecs() >= (lastInput + 200))
		
			'Make sure we are not mining already
			If (Self.isMining = False) And (buildMode = False)
		
				'Move Right
				If (KeyDown(KEY_RIGHT)) Or (KeyDown(KEY_D)) Or (checkTouchInput(1))
					If checkCollisions(1) = False
						offsetX = (offsetX - 64.0)
						Self.direction = 1
						Self.lastInput = Millisecs()
						Self.Fog()
					EndIf
				Endif
						
				'Move Left
				If (KeyDown(KEY_LEFT)) Or (KeyDown(KEY_A)) Or (checkTouchInput(3))
					If checkCollisions(3) = False
						offsetX = (offsetX + 64.0)
						Self.direction = 3
						Self.lastInput = Millisecs()
						Self.Fog()
					EndIf
				Endif
						
				'Move Up
				If (KeyDown(KEY_SPACE)) Or (KeyDown(KEY_W)) Or (KeyDown(KEY_UP)) Or (checkTouchInput(2))
					If isJumping = False
						If checkCollisions(2) = False
							offsetY = (offsetY + 64.0)
							Self.direction = 2
							Self.lastInput = Millisecs()
							Self.jumpStart = Millisecs()
							Self.isJumping = True
							Self.Fog()
						EndIf
					EndIf
				Endif
						
				'Move Down
				If (KeyDown(KEY_DOWN)) Or (KeyDown(KEY_S)) Or (checkTouchInput(0))
					If checkCollisions(0) = False
						offsetY = (offsetY - 64.0)
						Self.direction = 0
						Self.lastInput = Millisecs()
						Self.Fog()
					EndIf
				Endif
				
				'Mine - check 5 finger indexes
				#If TARGET="android"
					For Local t:Int = 0 To 4
						If TouchHit(t)
							Self.Mine(t)
						Endif
					Next
				#Else
					If TouchHit(0)
						Self.Mine(0)
					Endif
				#EndIf
				
				If KeyHit(KEY_F1)
					Local start:Int = Millisecs()
					saveMap()
					Print "Map Saved In: " + (Millisecs() - start)
				Endif
				
				If KeyHit(KEY_F2)
					Local start:Int = Millisecs()
					loadMap()
					Print "Map Loaded In: " + (Millisecs() - start)
				Endif
				
			Endif
			
			'Check If Build Mode Button Hit
			If (Self.isMining = False)
				If (KeyHit(KEY_ENTER)) Or (checkTouchInput(4))
					
					'Check to see if enough time has passed between hits (half a second)
					If (Millisecs() >= (lastBuildModeHit + 150))
						If buildMode = False
							buildMode = True
						ElseIf buildMode = True
							buildMode = False
						Endif
						lastBuildModeHit = Millisecs()
					EndIf
						
				Endif
			Endif
			
			'If we are in build mode build check to see if we need to build blocks
			If buildMode = True
				For Local i:Int = 0 To 4
					If TouchHit(i)
					
						'Get TouchX/Y Positions to check brick with	
						Local x:Float = (Floor((VTouchX(i) - offsetX)/64.0))
						x = (x * 64.0)
						Local y:Float = (Floor((VTouchY(i) - offsetY)/64.0))
						y = (y * 64.0)
						
						'Get brick
						Local b:brick = mapList.Get(x + "_" + y)
						
						'Create new brick
						If (b = Null)
							b = New brick(selectedBrick, x, y, False)
							b.type = selectedBrick
							b.broken = False
							b.fog = False
							mapList.Set(x + "_" + y, b)
						Elseif (b.broken = True)
							b.type = selectedBrick
							b.broken = False
							b.fog = False
							mapList.Set(x + "_" + y, b)
						Endif 
						
					EndIf
				Next
			Endif
			
		EndIf
		
	End Method
	
	'Checks collisions when trying to move
	Method checkCollisions:Bool(direction:Int)
	
		'General brick
		Local b:brick
		
		'Attempting to move right
		If (direction = 1)
			
			'Get brick to right
			b = mapList.Get(((Self.x - offsetX) + 64.0) + "_" + (Self.y - offsetY))
			
		Elseif (direction = 3)
			
			'Get brick to right
			b = mapList.Get(((Self.x - offsetX) - 64.0) + "_" + (Self.y - offsetY))
			
		Elseif (direction = 2)
			
			'Get brick to right
			b = mapList.Get((Self.x - offsetX) + "_" + ((Self.y - offsetY) - 64.0))
			
		Elseif (direction = 0)
			
			'Get brick to right
			b = mapList.Get((Self.x - offsetX) + "_" + ((Self.y - offsetY) + 64.0))
			
		EndIf
			
		'Check collision for brick	
		If (b = Null) Or (b.broken = True)
			Return False
		Else
			Return True 
		Endif
			
	End Method
	
	'This method attempts to mine a brick
	Method Mine:Void(t:Int)
		
		'Get TouchX/Y Positions to check brick with	
		Local x:Float = (Floor((VTouchX(t) - offsetX)/64.0))
		x = (x * 64.0)
		Local y:Float = (Floor((VTouchY(t) - offsetY)/64.0))
		y = (y * 64.0)
		
		'Get brick
		Local b:brick = mapList.Get(x + "_" + y)
		
		'Make sure brick exists
		If (b <> Null)
		
			'Make sure brick is not already broken
			If b.broken = False
			
				'Check 'collision' and distance of brick in relation to player
				If (b.x >= ((Self.x - offsetX) - 64.0))
					If (b.x <= ((Self.x - offsetX) + 64.0))
						If (b.y >= ((Self.y - offsetY) - 64.0))
							If (b.y <= ((Self.y - offsetY) + 64.0))
							
								'Start mining brick brick
								Self.brickMined = b
								Self.pickaxeX = x
								Self.pickaxeY = y
								Self.isMining = True
								Self.miningStart = Millisecs()
								'Dirt brick
								If b.type = 0
									Self.miningTimer = 750
								Else
									Self.miningTimer = 750
								EndIf
								
							Endif
						Endif
					Endif
				Endif
			
			EndIf
		Endif 

	End Method
	
	'This method updates fog blocks
	Method Fog:Void()
	
		Local b:brick  = mapList.Get(((Self.x - offsetX) - 128.0) + "_" + (Self.y - offsetY))
		If (b<>Null)
			b.fog = False
		EndIf
		
		b = mapList.Get(((Self.x - offsetX) - 64.0) + "_" + (Self.y - offsetY))
		If (b<>Null)
			b.fog = False
		EndIf
		
		b = mapList.Get(((Self.x - offsetX) + 64.0) + "_" + (Self.y - offsetY))
		If (b<>Null)
			b.fog = False
		EndIf
		
		b = mapList.Get(((Self.x - offsetX) + 128.0) + "_" + (Self.y - offsetY))
		If (b<>Null)
			b.fog = False
		EndIf
		
		b = mapList.Get(((Self.x - offsetX) - 64.0) + "_" + (Self.y - offsetY - 64.0))
		If (b<>Null)
			b.fog = False
		EndIf
		
		b = mapList.Get(((Self.x - offsetX)) + "_" + (Self.y - offsetY - 64.0))
		If (b<>Null)
			b.fog = False
		EndIf
		
		b = mapList.Get(((Self.x - offsetX) + 64.0) + "_" + (Self.y - offsetY - 64.0))
		If (b<>Null)
			b.fog = False
		EndIf
		
		b = mapList.Get(((Self.x - offsetX)) + "_" + (Self.y - offsetY - 128.0))
		If (b<>Null)
			b.fog = False
		EndIf
		
		b = mapList.Get(((Self.x - offsetX) - 64.0) + "_" + (Self.y - offsetY + 64.0))
		If (b<>Null)
			b.fog = False
		EndIf
		
		b = mapList.Get(((Self.x - offsetX)) + "_" + (Self.y - offsetY + 64.0))
		If (b<>Null)
			b.fog = False
		EndIf
		
		b = mapList.Get(((Self.x - offsetX) + 64.0) + "_" + (Self.y - offsetY + 64.0))
		If (b<>Null)
			b.fog = False
		EndIf
		
		b = mapList.Get(((Self.x - offsetX)) + "_" + (Self.y - offsetY + 128.0))
		If (b<>Null)
			b.fog = False
		EndIf
		
	End Method
	
	'Update the player
	Method Update:Void()
		
			'Update Player as long as we are not in build mode
			If (buildMode = False)
			
				'Update Jumping
				If (Self.isJumping = True)
					If (Millisecs() >= (Self.jumpStart + 500))
						Self.isJumping = False
					Endif
				EndIf
				
				'Update Falling (gravity)
				If Self.isJumping = False
					If (Millisecs() >= (Self.lastFall + 150))
						Local brickBelow:brick = mapList.Get((Self.x - offsetX) + "_" + ((Self.y - offsetY) + 64.0))
						If (brickBelow = Null) Or (brickBelow.broken = True)
							offsetY = (offsetY - 64.0)
							Self.direction = 0
							Self.lastFall = Millisecs()
							Self.lastInput = Millisecs()
							Self.Fog()
						Endif
					Endif
				Endif
				
				'Update Mining
				If (Self.isMining = True)
					If (Millisecs() >= (Self.miningStart + Self.miningTimer))
						Self.brickMined.broken = True
						Self.isMining = False
					EndIf
				EndIf
			
			EndIf
			
	End Method
	
	'This method draws the player
	Method Draw:Void(playerImage:Image, pickaxeImage:Image)
	
		'Draw player image
		DrawImage(playerImage, Self.x - offsetX, Self.y - offsetY)
		'DrawText("START", 0,220)
		
		'Draw pickaxe
		If (Self.isMining = True)
			DrawImage(pickaxeImage, Self.pickaxeX, Self.pickaxeY)
		EndIf
		
	End Method
	
End Class

'Brick class
Class brick

	'Brick Fields
	Field type:Int 'Type of brick
	Field x:Float 'X Location
	Field y:Float 'Y Location
	Field broken:Bool 'Visibility
	Field fog:Bool 'False = visible, True = invisible

	'This method creates a new brick
	Method New(t:Int, xLoc:Float, yLoc:Float, v:Bool)
		Self.type = t
		Self.x = xLoc
		Self.y = yLoc
		Self.broken = v
		If Self.y = 256.0
			Self.fog = False
		Else
			Self.fog = True
		EndIf
	End Method
	
End Class

'This function handles touch input
Function checkTouchInput:Bool(type:Int)

	'If currently running on android do touch check
	'#If TARGET="android"
	
		'Check for 5 finger indexes
		For Local i:Int = 0 To 4
		
			'If currently touching screen
			If TouchDown(i)
			
				'Check for right button press
				If (type = 1)
				
					'Check for 5 finger indexes
					For Local t:Int = 0 To 4
						If (VTouchX(t) >= 142.0) 
							If (VTouchX(t) <= 217.0) 
								If (VTouchY(t) >= 330.0) 
									If (VTouchY(t) <= 397.0)
										Return True
									Endif
								Endif
							Endif
						Endif
					Next
					
					'No button press detected
					Return False
					
				'Check for left button press
				Elseif (type = 3)
				
					'Check for 5 finger indexes
					For Local t:Int = 0 To 4
						If (VTouchX(t) >= 9.0) 
							If (VTouchX(t) <= 79.0)
								If (VTouchY(t) >= 330.0) 
									If (VTouchY(t) <= 397.0)
										Return True
									Endif
								Endif
							Endif
						Endif
					Next
					
					'No button press detected
					Return False
					
				'Check for up button press
				Elseif (type = 2)
				
					'Check for 5 finger indexes
					For Local t:Int = 0 To 4
						If (VTouchX(t) >= 79.0) 
							If (VTouchX(t) <= 142.0) 
								If (VTouchY(t) >= 260.0) 
									If (VTouchY(t) <= 330.0)
										Return True
									Endif
								Endif
							Endif
						Endif
					Next
					
					'No button press detected
					Return False
					
				'Check for down button press
				Elseif (type = 0)
				
					'Check for 5 finger indexes
					For Local t:Int = 0 To 4
						If (VTouchX(t) >= 79.0) 
							If (VTouchX(t) <= 142.0)
								If (VTouchY(t) >= 397.0) 
									If(VTouchY(t) <= 471.0)
										Return True
									Endif
								Endif
							Endif
						Endif
					Next
					
					'No button press detected
					Return False
					
				'Check for Build Mode button press
				Elseif (type = 4)
					'Check for 5 finger indexes
					For Local t:Int = 0 To 4
						If (VTouchX(t) >= 505.0) 
							If (VTouchX(t) <= 583.0)
								If (VTouchY(t) >= 377.0) 
									If(VTouchY(t) <= 455.0)
										Return True
									Endif
								Endif
							Endif
						Endif
					Next
					
					'No button press detected
					Return False
					
				Endif
				
			Endif
			
		Next
		
		'No touch input detected at all
		Return False
		
	'#Endif
	
	'We are not running on android device
	Return False
	
End Function


Function saveMap:Void()
	Local MAPFILE:String = ","
	MAPFILE = MAPFILE.Join(saveBricks())
	SaveState(MAPFILE)
	'Print "SAVED!"
End Function

Function loadMap:Void()
	mapList = Null
	mapList = New StringMap<brick>
	Local data:String = LoadState()
	Local arr:String[] = data.Split(",")
	
	For Local i:Int = 0 To (arr.Length() - 2)
		Local b:brick = loadBrick(arr, i)
		mapList.Set(b.x + "_" + b.y, b)
		i = i + 4
	Next
	'Print "LOADED!"
End Function

Function saveBricks:String[]()
	Local arr:String[mapList.Count()]
	Local i:Int = 0
	For Local b:brick = Eachin mapList.Values()
		arr[i] = b.type + "," + b.x + "," + b.y + "," + Int(b.broken) + "," + Int(b.fog)
		i = i + 1
	Next
	Return arr	
End Function

Function loadBrick:brick(arr:String[], pos:Int)
	Local b:brick = New brick(Int(arr[pos]), Float(arr[pos + 1]), Float(arr[pos + 2]), False)
	If Int(arr[pos + 3]) > 0
		b.broken = True
	Endif
	If Int(arr[pos + 4]) > 0
		b.fog = True
	Else
		b.fog = False
	EndIf
	Return b
End Function


'This function handles map generation
Function generateMap:Void()

	'Create a random seed generator
		Local rndSeed:Int = 0
		Local da:Int[] = GetDate()
		For Local i:Int = 0 To 6
			rndSeed = rndSeed + da[i]
		Next
		Seed=(rndSeed + Millisecs())
		Print "SEED:" + Seed
		
		Local d:Int = 0
		Local c:Int = 0
		Local s:Int = 0
		Local g:Int = 0
		Local e:Int = 0
		
		'Create map
		Local size:Int = 200
		Local x:Float = Float((((size/2) * 64.0) * - 1))
		Local y:Float = 256.0
		For Local i:Int = 0 To ((size + 50) - 1)
			For Local i2:Int = 0 To (size - 1)
				
				Local b:brick
				
				'Brick is not on surface
				If (y > 256.0)
					
					'Get surrounding bricks
					Local b1:brick = mapList.Get((x - 64.0)  + "_" + y)
					Local b2:brick = mapList.Get((x - 64.0)  + "_" + (y - 64.0))
					Local b3:brick = mapList.Get(x  + "_" + (y - 64.0))
					Local b4:brick = mapList.Get((x + 64.0)  + "_" + (y - 64.0))
					
					'Get types of bricks nearby
					Local rndType:Int = 0
					If (b1 <> Null) And (b1.type <> 0)
						rndType = b1.type
					Elseif (b2 <> Null) And (b2.type <> 0)
						rndType = b2.type
					Elseif (b3 <> Null) And (b3.type <> 0)
						rndType = b3.type
					Elseif (b4 <> Null) And (b4.type <> 0)
						rndType = b4.type
					Else
					
						'Check to see if empty brick is nearby
						Local broke:Bool = False
						If (b1 <> Null)
							If b1.broken = True
								rndType = 10
								broke = True
							Endif
						Endif
						'If broke = False
						'	If (b2 <> Null)
						'		If b2.broken = True
						'			rndType = 10
						'			broke = True
						'		Endif
						'	Endif
						'Endif
						If broke = False
							If (b3 <> Null)
								If b3.broken = True
									rndType = 10
									broke = True
								Endif
							Endif
						Endif
						'If broke = False
						'	If (b4 <> Null)
						'		If b4.broken = True
						'			rndType = 10
						'			broke = True
						'		Endif
						'	Endif
						'Endif
						
					EndIf
					
					'No special bricks
					If rndType = 0	
					
						Local rndBrick:Float = Int(Rnd(0.0, 100.0))
					
						'Make coal brick
						If (rndBrick <= 5)
					
							b = New brick(1, x, y, False)
							c = c + 1
						
						'Make silver brick
						Elseif (rndBrick >= 6) And (rndBrick <= 8)
						
							b = New brick(2, x, y, False)
							s = s + 1
							
						'Make gold brick
						Elseif (rndBrick = 9)
						
							b = New brick(3, x, y, False)
							g = g + 1
							
						'Make empty	space (cave)
						Elseif (rndBrick >= 10) And (rndBrick <= 12)
						
							b = New brick(0, x, y, True)
							e = e + 1
						
						'Make dirt brick
						Else
						
							b = New brick(0, x, y, False)
							d = d + 1
							
						Endif
						
					'Coal brick nearby
					Elseif rndType = 1	
					
						Local rndBrick:Float = Int(Rnd(0.0, 50.0))
					
						'Make coal brick
						If (rndBrick <= 5)
					
							b = New brick(1, x, y, False)
							c = c  + 
							1
						'Make dirt brick
						Else
							b = New brick(0, x, y, False)
							d = d + 1
						Endif
						
					'Silver brick nearby
					Elseif rndType = 2	
					
						Local rndBrick:Float = Int(Rnd(0.0, 65.0))
					
						'Make Silver brick
						If (rndBrick <= 5)
					
							b = New brick(2, x, y, False)
							s = s + 1
						'Make dirt brick
						Else
							b = New brick(0, x, y, False)
							d = d + 1
						Endif
						
					'Gold brick nearby
					Elseif rndType = 3	
					
						Local rndBrick:Float = Int(Rnd(0.0, 75.0))
					
						'Make Gold brick
						If (rndBrick <= 5)
					
							b = New brick(3, x, y, False)
							g = g + 1
						'Make dirt brick
						Else
							b = New brick(0, x, y, False)
							d = d + 1
						Endif
						
					'Empty brick nearby
					Elseif rndType = 10	
					
						Local rndBrick:Float = Int(Rnd(0.0, 12.0))
					
						'Make Empty brick
						If (rndBrick <= 5) And (y >= 384.0)
					
							b = New brick(0, x, y, True)
							e = e + 1
					
						'Make dirt brick
						Else
							b = New brick(0, x, y, False)
							d = d + 1
						Endif
						
					EndIf
					
				'Brick is on surface, make dirt brick	
				Elseif (y = 256.0)
				
					'Make dirt brick
					b = New brick(0, x, y, False)
					d = d + 1
					
				EndIf
				
				mapList.Set(x + "_" + y, b)
				x = (x + 64.0)
			Next
			x = Float((((size/2) * 64.0) * -1))
			y = (y + 64.0)
		Next
		
		Print "Dirt bricks: " + d
		Print "Coal bricks: " + c
		Print "Silver bricks: " + s
		Print "Gold bricks: " + g
		Print "Empty bricks: " + e
		Print "Total bricks: " + (d + c + s + g + e)
		
		'Local start:Int = Millisecs()
		'saveMap()
		'Print "Map Saved In: " + (Millisecs() - start)
		'start = Millisecs()
		'loadMap()
		'Print "Map Loaded In: " + (Millisecs() - start)
		
End Function

'This function draws currently selected brick in build mode
Function drawSelectedBrick:Void()
	If selectedBrick = 0
		DrawImage(img_dirtBrick, ((offsetX * -1) + 280.0), ((offsetY * -1) + 405.0))
	EndIf
End Function

