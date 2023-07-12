## Checklist - Make sure that all of these items apply
- [ ] Remove all unneeded comments 
- [ ] Rebase from the latest develop branch 
- [ ] Test the code after rebasing
- [ ] Follow the file structure created before 
- [ ] Follow the naming conventions 
- [ ] Change the task to `done` on Jira after all the checks are made 

## How to rebase from develop branch in VSCode? 
- Run the following commands in your terminal in VSCode: 
  - `git checkout develop`
  - `git pull`
  - `git checkout <your-branch-name>`
  - `git rebase develop` 
- Now, you will most probably find conflicts with the develop branch. Follow these steps to solve the conflicts:
  - Open github tab in VSCode to make things easier
  - You will find on the left bar under Github tab some changes called: Merge Changes. You will need to solve every conflict of them
  - When you click any of them, the file having the conflict will open and for every conflict in the file you will have 3 options: 
    - Accept Current Change => This is the change created in your branch
    - Accept Incoming Branch => This is the change coming from the other branch
    - Accept Both => Accepts both branches
  - Choosing which option of the 3 depends on your case
  - After solving all the conflicts, run `git log` and check that the log makes sense and the order of the commits between your branch and the develop branch make sense
  - Finally, run: `git push --force-with-lease` to push the final changes to your branch
  - Now, the branch can be merged with `develop` branch without problems!

