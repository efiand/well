cls
@set /P commit="Commit text: "
git add .
git commit -m "%commit%"
git push
