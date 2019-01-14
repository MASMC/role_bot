# Discord Role Bot
### A bot for all those who can't enable 2-Factor authentication
*I know the pain*

[![Build status](https://ci.appveyor.com/api/projects/status/fxnlhkq0lpdqe8de/branch/master?svg=true)](https://ci.appveyor.com/project/MASMC/role-bot/branch/master)

--------------------

## About the Project

Hi. My name is Mike. I'm the developer of this bot. I'd like to show you around for a bit. First up, I should *probably* teach you how to install it, and get it up and running for the first few seconds of its ~~short~~ life.
*"That sounds easy enough!"* you might say, but in reality, it is. You just need a Discord development project, bot API key, NodeJS, and some other modules for that.

Oh? What's that? You *don't* know how to get all that? Well, okay then, I'll have to show you!
First up, we need you to (of course) download this code and put it somewhere safe, where it won't be disturbed. It likes a dark or RGB LED lit room, sitting at around 25 degrees Celsius, where it can sit untouched for years. Your hard drive looks like the perfect place! Let's start there.

--------------------

Alright, so you've found this code on GitHub, I assume. If you didn't, please head there and download it, so you can show your support to the original author of the code. Here's a link: [MASMC's GitHub](http://github.com/MASMC/role_bot)

Now that you're there, please obtain your fresh copy of the code, either by [cloning it with GitHub](https://github.com/MASMC/role_bot.git) (if you know how), or by [downloading the ZIP file](https://github.com/MASMC/role_bot/archive/master.zip). If you downloaded the ZIP, extract it's contents to a folder that you know the location of. I personally prefer `C:\Users\<username>\Documents\dev\bot\role_bot`, considering I am developing it on a near-daily basis, but you can put it wherever you want! Just make sure you know where it is.

Now, on to downloading NodeJS to be able to actually do something with the bot! I think you'd like to be able to run it, of course, if you want to use it.

--------------------

First up here, download NodeJS, from their official website. Downloading it from elsewhere could make your computer very, very sick, and Role Bot doesn't like that at all! [Here's a link to the official website of NodeJS.](http://nodejs.org/)

Once you have NodeJS installed, open your command line (or prompt, for Windows users). Make sure it's properly set up by running the command `node`. It should show up a screen with a little arrow on it, after the command. It will most likely just be the next line. If that happens, then you're good to go, just type in `.exit` to get back to where you were! If not, honestly, I can't help you. Sorry :<

Now, if you've gotten here, you probably have NodeJS installed, so we are going to install the dependencies required for the bot to actually run. In your CLI (Short for Command Line Interface, or Command Prompt), go to the place where you put the extracted code. In my case, since I run on Windows, and keep my code in a certain place, I would type in `cd C:\Users\Admin\Documents\dev\bot\role_bot`. Just replace the command and path with whatever you need to, to get to your code.
Once there, you'll need to install packages using the Node Package Manager. It's pretty simple to use, and, y'know what, I'll even give you the exact command you need! It is `npm install -s discord.js fs log-timestamp`. Simple, right?

What? Oh, guess not. Well, quick explanation time! `npm` is short for "Node Package Manager". That's simple enough. `install` tells `npm` that we want to start installing stuff. `-s` is shorthand for `-save`, which tells `npm` that we want to save some additional stuff to a file that's in the directory. And lastly, `discord.js fs log-timestamp` are packages, separated by spaces. `discord.js` is the Discord API that I used to code the bot, `fs` is a default node package (I just re-install to ensure that it's in the working directory. Dev talk, for those who want it.), and `log-timestamp` is a package that adds timestamps before logging statements in the console. Pretty simple, once you think about it.

--------------------

Cool, now you've got the packages set up, you've got the code ready, now I guess you're ready to start! Go ahead and type in `node main.js`, and watch the bot st- oh... oh... it didn't work? Wh- why?! It should have worked! I coded this perfectly, with testing al- oh... wait, I know what happened. You don't have the credentials to set it up properly. Remember how I said something about needing an API key and all that jazz? Yeah, discord.js requires you to have an API key to be able to log in. This is a pretty simple fix, actually. I've provided the file, of course with my credentials removed. I don't want someone maliciously taking over my personal bot, now!

So, what you need to do is open up your favourite text editor (Preferably Notepad++ or Atom, though Sublime Text will do. Notepad is worthless in this situation) and find the file `credentials.json` in the credentials folder. You'll see a nicely formatted file there. *No, don't touch that! Or that! Ughhhh, I'll tell you what to touch in a minute. Just wait.* Now that we're here, we need to get you your very own Discord Project! You'll have to have a Discord account for this, of course, no surprise considering it's a Discord bot. Head on over to the super secret [developer page](http://discordapp.com/developers/applications), and don't tell anyone I told you!

Once you're there, go ahead and make a new application. Should be a giant bevel square, with a plus in the middle. Says "Create an application" right under it. Yup, right there. Click the shiny button! Now you've got an application! Whooo! Now, don't take notes here, the rest of this is super secret, and you can't share it with anyone! I actually mean this one, because malicious users (AKA hackers) can use information here to take over your bot and put their own code in it. Anyways, back to the application. Some stuff here needs your attention!

Firstly, name your application. I, of course being the developer of the bot, named mine the fitting `Role Bot`. This part allows you to control a few aspects of the bot, such as how it would show if it were a game. We aren't concerned with much here, besides the name and icon. These ones will only be seen by you, but you should still make it all pretty so you can tell what it is when you have your own bots out there in the Discord world.
Next up, is creating the bot itself. It needs its own user to ~~take over~~ ~~control~~ send and receive messages. This will be what lets it do all that! Head on over to the tab with the puzzle piece icon (Hint: It says "Bot" next to it), and I'll see you there!

Now that you're here, you can read some stuff on this page. All you really need to know, is that if you don't need a bot, or want a bot, you should ***NOT*** click the button to make one, because the bot can't be deleted. Ever. I don't even think Discord can delete it... *shudder*
Well, now that we're here, since we want to make a bot, go ahead and click that button! Go on, it's fine, I can confirm it, don't worry! Oh, you've already done it? Oh no... that's ~~bad~~ great. Now the bot can ~~take over the world~~ function! Next up is actually building the bot! Give it a good name. I named mine "Bob"! (Not really, it's named "Role Bot", what else would it be?) Once you've done that, give it a nice picture. It deserves to look good, and everyone will see the name and picture, so be careful what you put there!
Now, here comes the super secret part. ***Do not share this next part with anyone, it is a major security breach, and hackers can take over your bot if you do so!***

Get your `credentials.json` file ready, this part needs to be done carefully, or it could break horribly. As a reminder, from now on, anything you do from now on must be followed to the dot. I'm removing all the extra fluff now, and actually being serious for a reason. Now, looking at the `credentials.json` file, you'll see a line that looks like this: `"auth_token":""`
Put your cursor between the `""`, so you're ready to type there. Over on the application development page, there should be a button that says "Copy", under the "Token" category. Click that button, and it will automatically copy the token. Put it in the credentials file, where you have your cursor. You should be ready to go, now.

--------------------

Okay, back to the fluff! We're done with the super secret, super serious part! Yay!
So, save the file and close it. You don't want anyone seeing that token! Head on over to your CLI, where you were running NodeJS, which should still be in the same folder, and type in `node main.js`. It should give you a few lines, and then it should work! Just go to your Discord server, and set it up! Wait, what's that?
It isn't working? Oh, that's right, we forgot to invite it to the server, hahaha!

Now, remember how the website looked? This time, you don't need the bot tab, you need the OAuth tab. It's the one with the little wrench icon. Once you're there, scroll down and select "bot" from the big menu of things to choose. You don't need anything else, and it's better to not touch them. There's a little copy button down there, too, and of course, you need to tap dat buddon! It will copy the big link that was to the side of it, and then you paste that into a new tab. Once you've got that little website, there is a box to select a server, you need to select the server you're adding the bot to, then click `Authorize`. It'll add the bot, and it will be completely working!

--------------------

## Contributing

### Adding error codes
Please ensure that when you add error codes, they stay in proper order (with numerical above alphabetical). The formatting should end up looking the same. Color and description direction are interchangeable, so long as both exist in the error object. Formatting:
```JSON
{
    "ERROR_NAME":{
        "color":"HEX_COLOUR_CODE",
        "description":"ERROR_DESCRIPTION"
    }
}
```

### Adding new message functions
All message functions belong in the handler file! Location: `/Modules/handler.js`
Please attempt to keep the formatting of the file, and keep all functions self contained. If a global variable is needed, you're doing it wrong.

### Updating the README.md
This shouldn't be touched, no PRs will be accepted that update the README file, beyond adding a name to the contributor list.

### Command documentation
Update this as you add commands. Once the github pages website is working, you will need to update that as well. For now, the file `COMMANDS.md` contain all the commands, with proper formatting.

--------------------

That's it, why are you still scrolling?

--------------------

*Special thanks to:*
- LyricWulf and his community
- The Coding Train
- AltoPikachu
- BitWolf
- Everyone else who helped with this project!

--------------------

*Contributors:*
When contributing to the bot, you can add your name here! Make sure not to add it multiple times, please :v

--------------------

*Author:*
~ Gear#4460
Love you all~
