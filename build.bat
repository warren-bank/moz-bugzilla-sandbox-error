@echo off

rem :: http://sevenzip.sourceforge.jp/chm/cmdline/commands/add.htm

7z a -tzip -scsUTF-8 "moz-bugzilla-sandbox-error.xpi" ".\chrome.manifest" ".\install.rdf" "components\01\" ".\LICENSE" ".\README.md"
