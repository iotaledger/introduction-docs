# Verify your Firefly Desktop Download

**When you download Firefly Desktop, you may want to verify its authenticity to make sure that you downloaded the correct one from the IOTA Foundation GitHub repository. In this how-to guode, you learn how to verify Firefly Desktop downloads.**


To verify the authenticity of Firefly Desktop, you can check its SHA256 hash and its code signature. Instructions for both of these steps differ, depending on your operating system.

## Windows Operating System

### Verify the SHA256 Hash

1. Open a command-line interface.

2. Create a SHA256 hash of the Firefly Desktop `.exe` file. Replace the path with the path to your Firefly `.exe` file.

```
certUtil -hashfile path\to\firefly-desktop-version.exe SHA256
```
  
For example, if the file is in the `C:\Users\yourname\Downloads` directory, do the following:
  
```
certUtil -hashfile C:\Users\yourname\Downloads\firefly-desktop-1.0.0.exe SHA256
```

3. Compare your SHA256 hash with the one in the [release notes](https://github.com/iotaledger/firefly/releases) and make sure that they match.

### Verify the Code Signature

1. Right-click on `firefly-desktop-version.exe`.

2. Go to **Digital Signatures** > **Details** > **View Certificate**.

3. In the Certification Path tab, make sure that the path matches the following information:

    - DigiCert.
    - DigiCert SHA2 Assured Code Signing CA.
    - IOTA Stiftung.

4. Make sure that the Certificate status reads, "This certificate is OK."

## MacOS Operating System

### Verify the SHA256 Hash

1. Open your Terminal (in `/Applications/Utilities/Terminal`).

2. Create a SHA256 hash of the Firefly Desktop `.dmg` file. Replace the path with the path to your Firefly `.dmg` file.

  ```bash
  shasum -a 256 /path/to/firefly-desktop-version.dmg
  ```

  For example, if the file is in `~/Downloads`, do the following:

  ```bash
  shasum -a 256 ~/Downloads/firefly-desktop-1.0.0.dmg
  ```

3. Compare your SHA256 hash with the one in the [release notes](https://github.com/iotaledger/firefly/releases) and make sure that they match.

### Verify the Code Signature

#### Prerequisites

To follow these instructions, you need the [Xcode Command Line Tools](https://www.ics.uci.edu/~pattis/common/handouts/macmingweclipse/allexperimental/macxcodecommandlinetools.html).

1. Open your Terminal (in `/Applications/Utilities/Terminal`).

2. Verify the `Firefly.app` file's signature. Replace the path with the path to your `Firefly.app` file. This command confirms whether the code binaries are actually signed, the signature is valid, all the sealed components are unaltered, and the signature passes a few basic consistency checks.

    ```bash
    codesign -d -vv /path/to/Firefly.app
    ```
    
    For example, if the file is in the `/Applications` directory, do the following:
    
    ```bash
    codesign -d -vv /Applications/Firefly.app
    ```

3. Make sure that the following information matches the output of the command:

    ```bash
    Identifier=org.iota.firefly
    Authority=Developer ID Application: IOTA Stiftung (UG77RJKZHH)
    Authority=Developer ID Certification Authority
    Authority=Apple Root CA
    ```

4. Test the signature against system policies. Replace the path with the path to your `Firefly.app` file.

    ```bash
    spctl -a -vv path/to/Firefly.app
    ```

    For example, if the file is in the `/Applications` directory, do the following:
    
    ```bash
    spctl -a -vv /Applications/Firefly.app
    ```

5. Make sure that the following information matches the output of the command (assuming Firefly is in the `/Applications` directory):

    ```
    /Applications/Firefly.app: accepted
    source=Developer ID
    origin=Developer ID Application: IOTA Stiftung (UG77RJKZHH)
    ```
    
    
## Linux Operating System

### Verify the SHA256 Hash

#### Prerequisites

You will need the `sha256sum` package, which is included with most Linux distributions, to complete these steps.

1. Open your Terminal.

2. Create a SHA256 hash of the Firefly Desktop executable file. Replace the path with the path to your Firefly executable file.

  ```bash
  sha256sum path/to/firefly-desktop-version.AppImage
  ```

  For example, if the file is in `~/Downloads`, do the following:

  ```bash
  sha256sum ~/Downloads/firefly-desktop-1.0.0.AppImage
  ```

3. Compare your SHA256 hash with the one in the [release notes](https://github.com/iotaledger/firefly/releases) and make sure that they match.

### Verify the Code Signature

1. Download the .asc and .gpg files in the Assets section of the [release notes](https://github.com/iotaledger/firefly/releases).

2. Import the Firefly GPG key from keyserver.ubuntu.com.

    ```bash
    gpg --keyserver keyserver.ubuntu.com --recv 466385BD0B40D9550F93C04746A440CCE5664A64
    ```

3. Make sure that the following information matches the output of the command:

    ```bash
    gpg: key 46A440CCE5664A64: public key "IOTA Foundation (IOTA Foundation Identity) <contact@iota.org>"
    ```

4. Verify the signature.

    ```bash
    gpg --verify path/to/firefly-desktop-version.AppImage.asc path/to/firefly-desktop-version.AppImage
    ```
    
    For example, if the .asc and .AppImage files are both in `~/Downloads`, do the following:
    
    ```bash
    gpg --verify ~/Downloads/firefly-desktop-1.0.0.AppImage.asc ~/Downloads/firefly-desktop-1.0.0.AppImage
    ```

5. Make sure that the following information matches the output of the command:

    ```bash
    gpg: Good signature from "IOTA Foundation (IOTA Foundation Identity) <contact@iota.org>"
    ```
