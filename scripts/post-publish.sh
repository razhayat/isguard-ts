version=$(npm view ./ version)
tag_name="v$version"

git tag "$tag_name"
git push origin "$tag_name" --no-verify
