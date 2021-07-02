function startChecking(password) {
  let result = zxcvbn(password);
  let s = result.score;
  let t = result.guesses;
  let seq = result.sequence;
  let timetoCrack = showTime(t);
  document.getElementById("crack").innerHTML = timetoCrack;
  if (!password) s = 5;
  showStrength(s);
  showCount(password.length);
  getCharSet(password);
  matchSeq(seq);
  return true;
}

function matchSeq(seq) {
  let seqSize = seq.length;
  let pattern,
    dictionary = new Array();
  for (let i = 0; i < seqSize; i++) {
    pattern = seq[i].pattern;
    dictionary = seq[i].dictionary_name;
    switch (pattern) {
      case "dictionary":
        showHasChars("dic");
        break;
      case "spatial":
        showHasChars("spa");
        break;
      case "repeat":
        showHasChars("repeat");
        break;
      case "date":
        showHasChars("date");
        break;
      case "bruteforce":
        showHasChars("brute");
        break;
      case "regex":
        showHasChars("regex");
        break;
    }
    switch (dictionary) {
      case "passwords":
        showHasChars("pass");
        break;
      case "english_wikipedia":
        showHasChars("eng");
        break;
      case "surnames":
        showHasChars("name");
        break;
      case "female_names":
        showHasChars("name");
        break;
      case "male_names":
        showHasChars("name");
        break;
      case "us_tv_and_film":
        showHasChars("tv");
        break;
    }
  }
}
function getCharSet(password) {
  if (password.search(/[a-z]/) != -1) {
    showHasChars("lower");
  } else {
    showHasChars("lower", true);
  }

  if (password.search(/[A-Z]/) != -1) {
    showHasChars("upper");
  } else {
    showHasChars("upper", true);
  }

  if (password.search(/[0-9]/) != -1) {
    showHasChars("numb");
  } else {
    showHasChars("numb", true);
  }

  if (password.search(/[!'#£$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/) != -1) {
    showHasChars("symb");
  } else {
    showHasChars("symb", true);
  }
}

function showHasChars(typeofchar, clear) {
  if (document.getElementById("has_" + typeofchar)) {
    thiselem = document.getElementById("has_" + typeofchar);
  } else {
    return false;
  }

  if (clear) {
    thiselem.className = "hasit";
  } else {
    if (thiselem.className.indexOf("type_valid") == -1) {
      thiselem.className = thiselem.className + " type_valid";
    }
  }
}
function showTime(time) {
  if (time == 1) return "0 Second";
  if (time < 120) return getTime(time, true) + " Seconds";
  let hour = 60 * 60;
  if (time < hour) {
    minutes = time / 60;
    return getTime(minutes, true) + " Minutes";
  }
  let day = hour * 24;
  if (time < 2 * day) {
    hours = time / hour;
    return getTime(hours) + " Hours";
  }
  let month = day * 30;
  if (time < month) {
    days = time / day;
    return getTime(days) + " Days";
  }
  let year = day * 365;
  if (time < year) {
    months = time / month;
    return getTime(months) + " Months";
  }
  let century = year * 100;
  if (time < century) {
    years = time / year;
    return getTime(years) + " Years";
  }

  if (time < century * 100) {
    centuries = time / century;
    return getTime(centuries) + " Centuries";
  }
  years = time / year;
  return getTime(years) + " Years";

  function getTime(time, numDp) {
    let newTime = "";
    let trillion = Math.pow(10, 12);
    let billion = Math.pow(10, 9);
    let million = Math.pow(10, 6);
    let thousand = Math.pow(10, 4);
    let hundred = Math.pow(10, 3);

    while (time / trillion >= 1) {
      newTime = " Trillion " + newTime;
      time = time / trillion;
    }
    while (time / billion >= 1) {
      newTime = " Billion " + newTime;
      time = time / billion;
    }
    while (time / million >= 1) {
      newTime = " Million " + newTime;
      time = time / million;
    }
    while (time / thousand >= 1) {
      newTime = " Thousand " + newTime;
      time = time / thousand;
    }
    while (time / hundred >= 1) {
      newTime = " Hundred " + newTime;
      time = time / hundred;
    }
    if (numDp) decimal = 100;
    else decimal = 1;
    time = Math.round(time * decimal) / decimal;
    newTime = time + newTime;
    return newTime;
  }
}
function showCount(count) {
  let chars = document.getElementById("char_count");
  let val = 570;
  if (count == 0) {
    chars.setAttribute("data-char_count", "0 Character");
    document.getElementById("count").style.strokeDashoffset = val;
  }
  if (count == 1) chars.setAttribute("data-char_count", "1 Character");
  if (count <= 63) {
    chars.setAttribute("data-char_count", count + " Characters");
    document.getElementById("count").style.strokeDashoffset = val - count * 5;
  } else {
    chars.setAttribute("data-char_count", count + " Characters");
    document.getElementById("count").style.strokeDashoffset = 255;
  }
}
function showStrength(c) {
  f = "Very Weak";
  let val = 570;
  if (c == 0) {
    f = "Very Weak";
    val = 560;
  }
  if (c == 1) {
    f = "     Weak";
    val = 500;
  }
  if (c == 2) {
    f = "     Medium";
    val = 440;
  }
  if (c == 3) {
    f = "     Strong";
    val = 380;
  }
  if (c == 4) {
    f = "Very Strong";
    val = 255;
  }
  if (c == 5) {
    f = "No Password";
    val = 570;
  }
  let strength = document.getElementById("strength");
  strength.setAttribute("data-strength", f);
  document.getElementById("bar").style.strokeDashoffset = val;
}
function toggleShowHide(thisvalue) {
  if (thisvalue.checked) {
    document.getElementById("password").type = "text";
  } else {
    document.getElementById("password").type = "password";
  }
}

