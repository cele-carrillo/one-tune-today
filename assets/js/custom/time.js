const songs = [
    {time: '2020-03-31T09:00:00.0+00:00', name: 'One way or another'},
    {time: '2020-04-01T09:00:00.0+00:00', name: 'You spin me round'},
    {time: '2020-04-02T09:00:00.0+00:00', name: 'A little less conversation'},
    {time: '2020-04-03T09:00:00.0+00:00', name: 'Express yourself'},
    {time: '2020-04-04T09:00:00.0+00:00', name: 'Life is Life'},
    {time: '2020-04-05T10:00:00.0+00:00', name: 'Jailhouse Rock'},
    {time: '2020-04-06T10:00:00.0+00:00', name: "Shake your booty"},
    {time: '2020-04-07T10:00:00.0+00:00', name: "Livin' la vida loca"},
    {time: '2020-04-08T10:00:00.0+00:00', name: "Thunderstruck / Ghostbusters mashup"},
    {time: '2020-04-09T10:00:00.0+00:00', name: "Danza Kuduro"},
    {time: '2020-04-10T10:00:00.0+00:00', name: "Funky Town"},
    {time: '2020-04-11T10:00:00.0+00:00', name: "Boogie Wonderland"},
    {time: '2020-04-12T10:00:00.0+00:00', name: "You're The First, The Last, My Everything"},
    {time: '2020-04-13T10:00:00.0+00:00', name: "Free Tibet"},
    {time: '2020-04-14T10:00:00.0+00:00', name: "You Give Love A Bad Name"},
    {time: '2020-04-15T10:00:00.0+00:00', name: "Lady Marmalade"},
    {time: '2020-04-16T10:00:00.0+00:00', name: "Hot Stuff"},
    {time: '2020-04-17T10:00:00.0+00:00', name: "Despacito"},
    {time: '2020-04-18T10:00:00.0+00:00', name: "Let's Get Loud"},
    {time: '2020-04-19T10:00:00.0+00:00', name: "September"},
    {time: '2020-04-20T10:00:00.0+00:00', name: "Groove is in the heart"},
    {time: '2020-04-21T10:00:00.0+00:00', name: "What is love"},
    {time: '2020-04-22T10:00:00.0+00:00', name: "Real wild child"},
    {time: '2020-04-23T10:00:00.0+00:00', name: "Weapon of choice"},
    {time: '2020-04-24T10:00:00.0+00:00', name: "Young hearts run free"},
    {time: '2020-04-25T10:00:00.0+00:00', name: "Brother Louie"},
    {time: '2020-04-26T10:00:00.0+00:00', name: "New sensation"},
    {time: '2020-04-27T10:00:00.0+00:00', name: "Beds are burning"},
    {time: '2020-04-28T10:00:00.0+00:00', name: "Dancing with myself"},
    {time: '2020-04-29T10:00:00.0+00:00', name: "Seven nation army"},
    {time: '2020-04-30T10:00:00.0+00:00', name: "Don't leave me this way"},
    {time: '2020-05-01T10:00:00.0+00:00', name: "Lust for life"},
    {time: '2020-05-02T10:00:00.0+00:00', name: "Play that funky music"},
];

const currentSongGracePeriod = 10 * 60 * 1000;
const closeEtaCountdown = 60 * 1000;

const mainDivDefaultContent = "<h1 class='heavy'>Ready for <br />today's <span class='pink'>tune?</span></h1>";
const secondaryDivDefaultContent = "Get ready to connect to your body and dance!";

function setNextSongMainDivContent(htmlContent) {
    const div = document.getElementById("next-song-main");
    div.innerHTML = htmlContent;
}

function setNextSongSecondaryDivContent(htmlContent) {
    const div = document.getElementById("next-song-secondary");
    div.innerHTML = htmlContent;
}

function printFarETACountdown(songName, countdown) {
    const hours = Math.floor(countdown / (1000 * 60 * 60));
    const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countdown % (1000 * 60)) / 1000);
    const timeExpression =  hours + "h " + minutes + "m " + seconds + "s";
    setNextSongMainDivContent(mainDivDefaultContent);
    setNextSongSecondaryDivContent(
        "We'll be dancing to <span class='aqua'>" + songName + "</span> in <span class='no-brake'>" + timeExpression + "</span>"
    );
}

function printCloseEtaCountDown(songName, countdown) {
    const seconds = Math.floor(countdown  / 1000);
    setNextSongMainDivContent("<h1 class='heavy'>The party <br />starts in <span class='pink'>" + seconds + "!</span></h1>");
    setNextSongSecondaryDivContent(secondaryDivDefaultContent);
}

function printSongCountdown(songName, countdown) {
    if (countdown < closeEtaCountdown) {
        printCloseEtaCountDown(songName, countdown);
    } else {
        printFarETACountdown(songName, countdown);
    }
}

function printCurrentSong(songName) {
    setNextSongMainDivContent("<h1 class='heavy'>We are dancing to <br /><span class='pink'>" + songName + "!</span></h1>");
    setNextSongSecondaryDivContent("Forget your troubles and dance!");
}

function calculateTimeFrom(utcTime) {
    const start = new Date().getTime();
    const utcStart = new Date(utcTime).getTime();

    setInterval(function () {
        const elapsed = new Date().getTime() - start;
        const utcNow = utcStart + elapsed;

        for (let i = 0; i < songs.length; i++) {
            const song = songs[i];
            const songTime = new Date(song.time).getTime();
            if (utcNow > songTime && utcNow < songTime + currentSongGracePeriod) {
                printCurrentSong(song.name);
                break
            }
            else if (songTime > utcNow) {
                const eta = songTime - utcNow;
                printSongCountdown(song.name, eta);
                break;
            }
        }
    }, 1000);
}

function getRealTime() {
    $.getJSON("https://worldtimeapi.org/api/timezone/Australia/Melbourne", function (data) {
        calculateTimeFrom(data.utc_datetime);
    });
}

getRealTime();