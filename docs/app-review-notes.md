# App Review notes — iCube 1.0 (iOS and tvOS)

Updated November 2, 2026. The text below is the current draft for ASC App Review Information. Saving it does not submit a version for review.

Remaining preparation before a later submission:
- Select and verify a freely distributable homebrew demonstration, including its licence, download URL and clean-install/device test. None is claimed in these notes.
- Reconcile App Privacy/age-rating/content-rights declarations with the final app. This note is not a declaration or submission approval.
- Confirm the deployed guide and policy URLs return the updated pages. Keep reviewer contact details in ASC; they are not copied into this public document.

---

Thank you for reviewing iCube.

ABOUT THIS BUILD
iCube is an open-source GameCube and Wii emulator for iPhone, iPad and Apple TV, based on Dolphin. No games, console firmware or BIOS files are bundled. Users import content they are entitled to use. iCube does not provide copyrighted games or Nintendo system software.

The App Store build uses interpreter emulation, not the JIT recompiler. No jailbreak, debugger or JIT setup is required. The developer debug server is disabled in the App Store configuration. Performance varies by device and game.

iCube does not require its own account or a demo login. Optional RetroAchievements sign-in connects directly to that service. Plus is not part of version 1.0; the existing Plus Lifetime product is an unfinished draft and is not being submitted with this version.

IMPORTING AND PLAYING
On iPhone or iPad, save a compatible game or homebrew file in Files. Choose Import Game in the library, select the file, then choose the imported title to play.

On Apple TV, choose Upload via Wi-Fi in the empty library, or open Settings > Sync & Network > Web UI & WebDAV. Keep iCube open. On a computer on the same network, open the displayed Web UI address and upload the file. Choose the imported title in the TV library.

No sample title is bundled. Use game files or homebrew you are entitled to use. GameCube software does not require Wii system files. If Wii software asks for system files, import a BootMii NAND backup from a Wii you own; the app does not download those files.

HELP AND PRIVACY
App Store build guide: https://icube-emu.com/app-store/
Importing: https://icube-emu.com/guide/importing/
Wii system files: https://icube-emu.com/guide/wii-system-files/
Save state compatibility: https://icube-emu.com/help/save-state-compatibility/
Privacy policy: https://icube-emu.com/privacy/
Support: https://icube-emu.com/support/

Optional crash and performance diagnostics use Sentry. Reporting is on by default and can be disabled at Settings > Privacy > Share Crash Reports. The App Store configuration is designed to remove game identifiers and app-data paths from diagnostics. Sideloaded builds have different diagnostic behavior, as explained in the policy.

The local HTTP/WebDAV file server is for transfers on the user's network; transfers are not encrypted. Optional cover art, cheats, skins, help content and RetroAchievements contact their respective services as described in the privacy policy. Imported games run as emulated software; these downloads do not install native app extensions.

SOURCE AND LICENCE
https://github.com/Provenance-Emu/iCube
GNU General Public License, version 2 or later.
GameCube and Wii are trademarks of Nintendo. iCube is not affiliated with Nintendo.

---
