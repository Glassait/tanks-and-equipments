if [%1] == [] echo "Tag name required"
if NOT [%1] == [] "c:/Program Files/Git/cmd/git.exe" tag %1 && "c:/Program Files/Git/cmd/git.exe" push origin %1