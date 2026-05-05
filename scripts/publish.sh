npm run test || exit
npx tsc --noEmit || exit
npm run build || exit

version=$(npm view ./ version)
tag_name="v$version"

git tag "$tag_name"
git push origin "$tag_name" --no-verify
