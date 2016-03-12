Decklink To RTMP
================

Stream the input to a decklink card to an RTMP server.

# Requirments
- NodeJS.
- [ffmpeg](https://trac.ffmpeg.org/wiki/CompilationGuide) installed (with the libfdk_aac audio codec).
- bmdcapture (from [bmdtools](https://github.com/lu-zero/bmdtools)).

# Configuration
Create "config.json".
Look at "config.json.sample".

# Running
`nodejs main.js`

## Format Modes
This is the output of the `DeviceList` sample application inluded with the blackmagic SDK for a decklink quad card.
The `formatMode` is an integer which represents a row in the output (zero indexed). E.g. `12` for `720p59.94`.

```
=============== DeckLink SDI ===============

Attribute list:
 Serial port present ?                    No
 Device Persistent ID:                    Not Supported on this device
 Device Topological ID:                   300500
 Number of sub-devices:                   4
 Sub-device index:                        3
 Number of audio channels:                8
 Input mode detection supported ?         Yes
 Full duplex operation supported ?        No
 Internal keying supported ?              Yes
 External keying supported ?              No
 HD-mode keying supported ?               No

Supported video output display modes and pixel formats:
 NTSC                 	 720 x 486 	   29.97 FPS	 8-bit YUV	10-bit YUV	------		------		------		------		------------		------		
 NTSC 23.98           	 720 x 486 	  23.976 FPS	 8-bit YUV	10-bit YUV	------		------		------		------		------------		------		
 PAL                  	 720 x 576 	      25 FPS	 8-bit YUV	10-bit YUV	------		------		------		------		------------		------		
 1080p23.98           	 1920 x 1080 	  23.976 FPS	 8-bit YUV	10-bit YUV	------		------		------		------		------------		------		
 1080p24              	 1920 x 1080 	      24 FPS	 8-bit YUV	10-bit YUV	------		------		------		------		------------		------		
 1080p25              	 1920 x 1080 	      25 FPS	 8-bit YUV	10-bit YUV	------		------		------		------		------------		------		
 1080p29.97           	 1920 x 1080 	   29.97 FPS	 8-bit YUV	10-bit YUV	------		------		------		------		------------		------		
 1080p30              	 1920 x 1080 	      30 FPS	 8-bit YUV	10-bit YUV	------		------		------		------		------------		------		
 1080i50              	 1920 x 1080 	      25 FPS	 8-bit YUV	10-bit YUV	------		------		------		------		------------		------		
 1080i59.94           	 1920 x 1080 	   29.97 FPS	 8-bit YUV	10-bit YUV	------		------		------		------		------------		------		
 1080i60              	 1920 x 1080 	      30 FPS	 8-bit YUV	10-bit YUV	------		------		------		------		------------		------		
 720p50               	 1280 x 720 	      50 FPS	 8-bit YUV	10-bit YUV	------		------		------		------		------------		------		
 720p59.94            	 1280 x 720 	 59.9401 FPS	 8-bit YUV	10-bit YUV	------		------		------		------		------------		------		
 720p60               	 1280 x 720 	      60 FPS	 8-bit YUV	10-bit YUV	------		------		------		------		------------		------		

Supported video input display modes and pixel formats:
 NTSC                 	 720 x 486 	   29.97 FPS	 8-bit YUV	10-bit YUV	------		------		------		------		------------		------		
 NTSC 23.98           	 720 x 486 	  23.976 FPS	 8-bit YUV	10-bit YUV	------		------		------		------		------------		------		
 PAL                  	 720 x 576 	      25 FPS	 8-bit YUV	10-bit YUV	------		------		------		------		------------		------		
 1080p23.98           	 1920 x 1080 	  23.976 FPS	 8-bit YUV	10-bit YUV	------		------		------		------		------------		------		
 1080p24              	 1920 x 1080 	      24 FPS	 8-bit YUV	10-bit YUV	------		------		------		------		------------		------		
 1080p25              	 1920 x 1080 	      25 FPS	 8-bit YUV	10-bit YUV	------		------		------		------		------------		------		
 1080p29.97           	 1920 x 1080 	   29.97 FPS	 8-bit YUV	10-bit YUV	------		------		------		------		------------		------		
 1080p30              	 1920 x 1080 	      30 FPS	 8-bit YUV	10-bit YUV	------		------		------		------		------------		------		
 1080i50              	 1920 x 1080 	      25 FPS	 8-bit YUV	10-bit YUV	------		------		------		------		------------		------		
 1080i59.94           	 1920 x 1080 	   29.97 FPS	 8-bit YUV	10-bit YUV	------		------		------		------		------------		------		
 1080i60              	 1920 x 1080 	      30 FPS	 8-bit YUV	10-bit YUV	------		------		------		------		------------		------		
 720p50               	 1280 x 720 	      50 FPS	 8-bit YUV	10-bit YUV	------		------		------		------		------------		------		
 720p59.94            	 1280 x 720 	 59.9401 FPS	 8-bit YUV	10-bit YUV	------		------		------		------		------------		------		
 720p60               	 1280 x 720 	      60 FPS	 8-bit YUV	10-bit YUV	------		------		------		------		------------		------		

Supported video output connections:
  SDI

Supported video input connections:
  SDI
```
