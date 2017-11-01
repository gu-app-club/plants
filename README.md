# plants

## 🌱 Before you get going 🌱
Make sure you have installed [Vagrant](https://www.vagrantup.com/docs/installation/) and [Virtual Box 5.1](https://www.virtualbox.org/wiki/Downloads)

If you have the dependencies for this project, pop open a terminal (`ctrl-alt-t` for all you nasty neck-beards) and get ready to copy-pasta some commands.

Download the project:
```bash
git clone https://github.com/gu-app-club/plants.git
cd portfolio
```
Using Vagrant, build the development environment (this will not work if you don't have [Vagrant](https://www.vagrantup.com/docs/installation/) and [Virtual Box](https://www.virtualbox.org/wiki/Downloads) installed).

**If you are using Windows, run ALL Vagrant commands as administrator**
```bash
vagrant up
```
Some fancy text will start scrolling down matrix style. If you are in a public area with an audience, this is a great opportunity to full-screen your terminal and rollplay as 4chan, the internet's greatest hacker.

Awesome? No errors? Perfect! Just...
```bash
vagrant ssh
```
Vagrant gives you access to a virtual machine. The last command just let you ssh into it.

In the Vagrant environment move into the project folder. This is a shared directory with the GitHub repository.
```bash
cd plants
```
## 🌵 Running the webserver 🌵

To run the webserver:
``` bash
vagrant@vagrant:~/plants$ yarn run start
```
If there are no warnings, you should be able to navigate to [localhost:3000](http://localhost:3000) and view the project.

## 🍃 Got everything setup? Nice job! Go check the [issues](https://github.com/gu-app-club/plants/issues) page to get started. 🍃

<p align="center">
  <img src="https://media.giphy.com/media/wt1ZzHUumdeNO/giphy.gif" width="350px" />
</p>
