/* ============================================================
   PEH Quiz – script.js
   All 90 questions with bilingual (Arabic + English) feedback
   ============================================================ */

const TIMER_SECONDS = 30;

// ─── Quiz Data ────────────────────────────────────────────────────────────────
const quizData = [
  // ── Q1-10: SMB Relay Attack ──────────────────────────────────────────────
  {
    question: "1. What is the main purpose of an SMB Relay Attack?",
    options: [
      "A. To crack passwords using brute force",
      "B. To encrypt network traffic",
      "C. To reuse captured credentials to gain access",
      "D. To block SMB communication"
    ],
    answer: 2,
    explanationEn: "Correct answer is C because an SMB Relay Attack reuses captured credentials to gain access.",
    explanationAr: "الإجابة الصحيحة هي C لأن SMB Relay Attack يعتمد على إعادة استخدام بيانات الاعتماد الملتقطة للوصول إلى النظام.",
    whyWrong: {
      0: { en: "Incorrect because the attack does not rely on brute force.", ar: "هذا غير صحيح لأن الهجوم لا يعتمد على brute force." },
      1: { en: "Wrong because the attack does not encrypt traffic.", ar: "هذا خطأ لأن الهجوم لا يهدف إلى تشفير الحركة." },
      3: { en: "Incorrect because the goal is not to block SMB communication.", ar: "هذا خطأ لأن الهدف ليس حجب اتصال SMB." }
    }
  },
  {
    question: "2. Which protocol is exploited in an SMB Relay Attack?",
    options: ["A. HTTP", "B. FTP", "C. SMB", "D. DNS"],
    answer: 2,
    explanationEn: "Correct answer is C because the attack exploits the SMB protocol.",
    explanationAr: "الإجابة الصحيحة هي C لأن الهجوم يستغل بروتوكول SMB نفسه.",
    whyWrong: {
      0: { en: "HTTP is not the protocol targeted here.", ar: "HTTP ليس البروتوكول المستهدف هنا." },
      1: { en: "FTP is not related to this attack.", ar: "FTP ليس له علاقة بهذا الهجوم." },
      3: { en: "DNS is not used in SMB Relay.", ar: "DNS ليس البروتوكول المستخدم في SMB Relay." }
    }
  },
  {
    question: "3. Which tool is used to relay NTLM credentials?",
    options: ["A. Wireshark", "B. Metasploit", "C. impacket-ntlmrelayx", "D. Hydra"],
    answer: 2,
    explanationEn: "Correct answer is C because impacket-ntlmrelayx is used to relay NTLM credentials.",
    explanationAr: "الإجابة الصحيحة هي C لأن impacket-ntlmrelayx أداة مخصصة لتمرير/Relay بيانات NTLM.",
    whyWrong: {
      0: { en: "Wireshark is a network analyzer, not a relay tool.", ar: "Wireshark أداة تحليل شبكات وليست Relay." },
      1: { en: "Metasploit is a general framework, not the specific tool here.", ar: "Metasploit إطار عمل هجومي عام وليس الأداة المطلوبة هنا." },
      3: { en: "Hydra is mainly used for brute-force attacks.", ar: "Hydra تُستخدم غالبًا للهجمات التخمين/Brute force." }
    }
  },
  {
    question: "4. What happens if SMB signing is enabled on the target machine?",
    options: [
      "A. Attack becomes easier",
      "B. Relay attack is prevented",
      "C. Passwords are revealed",
      "D. Network slows down"
    ],
    answer: 1,
    explanationEn: "Correct answer is B because SMB signing prevents relay of SMB messages.",
    explanationAr: "الإجابة الصحيحة هي B لأن SMB signing يمنع إعادة توجيه/Relay الرسائل بشكل غير موثوق.",
    whyWrong: {
      0: { en: "Wrong because signing does not make the attack easier.", ar: "هذا خطأ لأن التوقيع لا يجعل الهجوم أسهل." },
      2: { en: "Signing does not reveal passwords.", ar: "التوقيع لا يكشف كلمات المرور." },
      3: { en: "This is not the direct effect of SMB signing.", ar: "هذا ليس الأثر المباشر للتوقيع." }
    }
  },
  {
    question: "5. SMB stands for __________ Message Block.",
    options: ["A. Secure", "B. Server", "C. System", "D. Simple"],
    answer: 1,
    explanationEn: "Correct answer is B because SMB stands for Server Message Block.",
    explanationAr: "الإجابة الصحيحة هي B لأن SMB اختصار Server Message Block.",
    whyWrong: {
      0: { en: "Secure is not the correct word here.", ar: "Secure ليست الكلمة الصحيحة هنا." },
      2: { en: "System is not the correct expansion.", ar: "System ليست التوسعة الصحيحة للاختصار." },
      3: { en: "Simple is not the correct expansion.", ar: "Simple ليست التوسعة الصحيحة للاختصار." }
    }
  },
  {
    question: "6. The default port used by SMB protocol is __________.",
    options: ["A. 80", "B. 443", "C. 445", "D. 21"],
    answer: 2,
    explanationEn: "Correct answer is C because SMB uses port 445 by default.",
    explanationAr: "الإجابة الصحيحة هي C لأن SMB يستخدم المنفذ 445 بشكل افتراضي.",
    whyWrong: {
      0: { en: "80 is HTTP, not SMB.", ar: "80 هو منفذ HTTP وليس SMB." },
      1: { en: "443 is HTTPS, not SMB.", ar: "443 هو منفذ HTTPS وليس SMB." },
      3: { en: "21 is FTP, not SMB.", ar: "21 هو منفذ FTP وليس SMB." }
    }
  },
  {
    question: "7. SMB Relay Attack requires cracking hashes before use.",
    options: ["A. True", "B. False"],
    answer: 1,
    explanationEn: "Correct answer is False because SMB Relay reuses captured credentials instead of cracking hashes.",
    explanationAr: "الإجابة الصحيحة هي False لأن SMB Relay يعتمد على إعادة استخدام الاعتماد الملتقط وليس كسره.",
    whyWrong: {
      0: { en: "Wrong because the attack does not need hash cracking first.", ar: "هذا خطأ لأن الهجوم لا يحتاج إلى كسر الهاشات أولاً." }
    }
  },
  {
    question: "8. Administrative privileges are required for meaningful access in SMB Relay attacks.",
    options: ["A. True", "B. False"],
    answer: 0,
    explanationEn: "Correct answer is True because administrative privileges provide meaningful access on the target.",
    explanationAr: "الإجابة الصحيحة هي True لأن امتيازات الإدارة تمنح وصولًا أكثر فاعلية على الهدف.",
    whyWrong: {
      1: { en: "Wrong because admin access is often needed for stronger impact.", ar: "هذا خطأ لأن الوصول الإداري يكون غالبًا هو المطلوب لتحقيق أثر أكبر." }
    }
  },
  {
    question: "9. Match the tools with their functions: Responder / ntlmrelayx / Nmap.",
    options: [
      "A. Relay NTLM credentials",
      "B. Capture authentication requests",
      "C. Check SMB security mode"
    ],
    answer: 1,
    explanationEn: "Responder captures authentication requests, ntlmrelayx relays NTLM credentials, and Nmap checks SMB security mode.",
    explanationAr: "Responder يلتقط طلبات المصادقة، ntlmrelayx يرحل NTLM credentials، و Nmap يفحص وضع أمان SMB.",
    whyWrong: {
      0: { en: "This is not Responder's function.", ar: "هذه ليست وظيفة Responder." },
      2: { en: "This is not Nmap's function here.", ar: "هذه ليست وظيفة Nmap هنا." }
    }
  },
  {
    question: "10. Which command is used to check SMB signing status?",
    options: [
      "A. nmap -p80",
      "B. nmap --script=smb2-security-mode.nse -p445",
      "C. ping 192.168.1.1",
      "D. netstat -an"
    ],
    answer: 1,
    explanationEn: "Correct answer is B because this command uses the smb2-security-mode script.",
    explanationAr: "الإجابة الصحيحة هي B لأن هذا الفحص يستخدم script خاص بـ SMB2 security mode.",
    whyWrong: {
      0: { en: "This checks port 80, not SMB.", ar: "هذا يفحص منفذ 80 وليس SMB." },
      2: { en: "Ping does not check SMB signing.", ar: "ping لا يفحص توقيع SMB." },
      3: { en: "Netstat shows connections but does not check SMB signing.", ar: "netstat يعرض الاتصالات ولا يفحص SMB signing." }
    }
  },

  // ── Q11-20: LNK File Attack ──────────────────────────────────────────────
  {
    question: "11. What is the main purpose of an LNK file attack?",
    options: [
      "A. To encrypt files",
      "B. To execute malicious commands via shortcut files",
      "C. To scan networks",
      "D. To block user access"
    ],
    answer: 1,
    explanationEn: "Correct answer is B because an LNK attack uses shortcut files to execute malicious commands.",
    explanationAr: "الإجابة الصحيحة هي B لأن هجوم LNK يستخدم ملفات الاختصار لتنفيذ أوامر خبيثة.",
    whyWrong: {
      0: { en: "This is not the goal of the attack.", ar: "هذا ليس هدف الهجوم." },
      2: { en: "The attack is not meant to scan networks.", ar: "الهجوم لا يهدف إلى مسح الشبكات." },
      3: { en: "The attack does not directly block user access.", ar: "الهجوم لا يهدف مباشرةً إلى حجب وصول المستخدم." }
    }
  },
  {
    question: "12. Which file type is used in an LNK file attack?",
    options: ["A. .exe", "B. .bat", "C. .lnk", "D. .dll"],
    answer: 2,
    explanationEn: "Correct answer is C because the .lnk extension is used in this type of attack.",
    explanationAr: "الإجابة الصحيحة هي C لأن امتداد LNK هو المستخدم في هذا النوع من الهجوم.",
    whyWrong: {
      0: { en: ".exe is not a shortcut file.", ar: ".exe ليس ملف الاختصار." },
      1: { en: ".bat is a batch file, not LNK.", ar: ".bat ملف دفعي وليس LNK." },
      3: { en: ".dll is a library, not a shortcut file.", ar: ".dll مكتبة برمجية وليست ملف اختصار." }
    }
  },
  {
    question: "13. Which tool is used to capture hashes in this attack?",
    options: ["A. Nmap", "B. Responder", "C. Netcat", "D. Burp Suite"],
    answer: 1,
    explanationEn: "Correct answer is B because Responder captures authentication requests and hashes.",
    explanationAr: "الإجابة الصحيحة هي B لأن Responder يلتقط طلبات المصادقة والهاشات.",
    whyWrong: {
      0: { en: "Nmap is a network scanning tool.", ar: "Nmap أداة فحص شبكات." },
      2: { en: "Netcat is a general networking tool.", ar: "Netcat أداة اتصالات عامة." },
      3: { en: "Burp Suite is for web application testing.", ar: "Burp Suite مخصص لاختبار تطبيقات الويب." }
    }
  },
  {
    question: "14. In the command -M slinky, what does 'slinky' represent?",
    options: ["A. Network port", "B. Target IP", "C. Malicious module", "D. Encryption method"],
    answer: 2,
    explanationEn: "Correct answer is C because slinky is a malicious module used in Responder.",
    explanationAr: "الإجابة الصحيحة هي C لأن slinky هو module خبيث ضمن Responder.",
    whyWrong: {
      0: { en: "It is not a network port.", ar: "ليس منفذ شبكة." },
      1: { en: "It is not the target IP.", ar: "ليس عنوان IP للهدف." },
      3: { en: "It is not an encryption method.", ar: "ليس طريقة تشفير." }
    }
  },
  {
    question: "15. The command sudo responder -I eth0 -dPv is used to __________ network requests.",
    options: ["A. block", "B. capture", "C. encrypt", "D. ignore"],
    answer: 1,
    explanationEn: "Correct answer is B because the command is used to capture network requests.",
    explanationAr: "الإجابة الصحيحة هي B لأن الأمر يستخدم لالتقاط network requests.",
    whyWrong: {
      0: { en: "It is not for blocking.", ar: "ليس للحجب." },
      2: { en: "It is not for encryption.", ar: "ليس للتشفير." },
      3: { en: "It is not for ignoring.", ar: "ليس للتجاهل." }
    }
  },
  {
    question: "16. The SERVER=10.0.2.0 option specifies the __________ address for payload execution.",
    options: ["A. client", "B. server", "C. gateway", "D. broadcast"],
    answer: 1,
    explanationEn: "Correct answer is B because SERVER specifies the server address.",
    explanationAr: "الإجابة الصحيحة هي B لأن SERVER يحدد عنوان الخادم.",
    whyWrong: {
      0: { en: "It is not the client address.", ar: "ليس عنوان العميل." },
      2: { en: "It is not the gateway.", ar: "ليس gateway." },
      3: { en: "It is not a broadcast address.", ar: "ليس عنوان broadcast." }
    }
  },
  {
    question: "17. LNK file attacks require the victim to interact with the malicious shortcut file.",
    options: ["A. True", "B. False"],
    answer: 0,
    explanationEn: "Correct answer is True because the victim must interact with the malicious file.",
    explanationAr: "الإجابة الصحيحة هي True لأن الضحية تحتاج للتفاعل مع الملف الخبيث.",
    whyWrong: {
      1: { en: "Wrong because interaction is usually required for impact.", ar: "خطأ لأن التفاعل غالبًا مطلوب لحدوث الأثر." }
    }
  },
  {
    question: "18. Responder is used to prevent attacks in this context.",
    options: ["A. True", "B. False"],
    answer: 1,
    explanationEn: "Correct answer is False because Responder is used offensively, not as a prevention tool here.",
    explanationAr: "الإجابة الصحيحة هي False لأن Responder أداة هجومية/استطلاعية وليست دفاعية هنا.",
    whyWrong: {
      0: { en: "Wrong because the tool does not prevent the attack in this context.", ar: "هذا خطأ لأن الأداة لا تمنع الهجوم في هذا السياق." }
    }
  },
  {
    question: "19. Match the tool/option with its function.",
    options: ["A. Executes malicious module", "B. Captures hashes", "C. Defines target server"],
    answer: 1,
    explanationEn: "Responder captures hashes, -M slinky executes a malicious module, and SERVER defines the target server.",
    explanationAr: "Responder يلتقط الهاشات، -M slinky ينفذ module خبيث، و SERVER يحدد الخادم.",
    whyWrong: {
      0: { en: "This is not the general function for all items.", ar: "هذه ليست الوظيفة العامة للجميع." },
      2: { en: "This is the function of SERVER only.", ar: "هذه وظيفة SERVER فقط." }
    }
  },
  {
    question: "20. What happens after executing the malicious LNK payload?",
    options: [
      "A. System shuts down",
      "B. Antivirus deletes files",
      "C. Payload executes and hashes may be captured",
      "D. Network disconnects"
    ],
    answer: 2,
    explanationEn: "Correct answer is C because execution may lead to hash capture.",
    explanationAr: "الإجابة الصحيحة هي C لأن التنفيذ قد يؤدي إلى التقاط الهاشات.",
    whyWrong: {
      0: { en: "This does not mean the system shuts down.", ar: "لا يعني ذلك إيقاف النظام." },
      1: { en: "This is not always the direct effect.", ar: "ليس هذا الأثر المباشر دائمًا." },
      3: { en: "The network does not necessarily disconnect.", ar: "ليس بالضرورة أن ينقطع الاتصال." }
    }
  },

  // ── Q21-30: LLMNR / Network Basics ──────────────────────────────────────
  {
    question: "21. What is the main purpose of LLMNR in a network?",
    options: [
      "A. Encrypt communication",
      "B. Resolve names when DNS fails",
      "C. Assign IP addresses",
      "D. Block attackers"
    ],
    answer: 1,
    explanationEn: "Correct answer is B because LLMNR is used to resolve names when DNS fails.",
    explanationAr: "الإجابة الصحيحة هي B لأن LLMNR يُستخدم لحل الأسماء عندما يفشل DNS.",
    whyWrong: {
      0: { en: "LLMNR does not encrypt communication.", ar: "LLMNR لا يشفّر الاتصال." },
      2: { en: "LLMNR does not assign IP addresses.", ar: "LLMNR لا يوزّع عناوين IP." },
      3: { en: "LLMNR is not an attacker-blocking mechanism.", ar: "LLMNR ليس آلية منع للهجمات." }
    }
  },
  {
    question: "22. Which interface is typically used when working within the same network?",
    options: ["A. tun0", "B. wlan0", "C. eth0", "D. lo"],
    answer: 2,
    explanationEn: "Correct answer is C because eth0 is commonly used on a wired local network.",
    explanationAr: "الإجابة الصحيحة هي C لأن eth0 هو الواجهة الشائعة في الشبكة المحلية السلكية.",
    whyWrong: {
      0: { en: "tun0 is usually used for VPNs.", ar: "tun0 غالبًا خاص بالـ VPN." },
      1: { en: "wlan0 is wireless and not always the intended interface.", ar: "wlan0 واجهة لاسلكية وليست دائمًا المقصودة هنا." },
      3: { en: "lo is the local loopback interface.", ar: "lo هو loopback المحلي." }
    }
  },
  {
    question: "23. Which protocol dynamically assigns IP addresses to devices?",
    options: ["A. DNS", "B. HTTP", "C. DHCP", "D. FTP"],
    answer: 2,
    explanationEn: "Correct answer is C because DHCP dynamically assigns IP addresses.",
    explanationAr: "الإجابة الصحيحة هي C لأن DHCP هو المسؤول عن توزيع عناوين IP ديناميكيًا.",
    whyWrong: {
      0: { en: "DNS resolves names, not IP assignment.", ar: "DNS لحل الأسماء وليس توزيع العناوين." },
      1: { en: "HTTP is a web protocol.", ar: "HTTP بروتوكول ويب." },
      3: { en: "FTP is a file transfer protocol.", ar: "FTP بروتوكول نقل ملفات." }
    }
  },
  {
    question: "24. What is the main function of the Rockyou.txt file?",
    options: [
      "A. Store encrypted files",
      "B. Scan networks",
      "C. Provide password wordlist for brute force",
      "D. Monitor traffic"
    ],
    answer: 2,
    explanationEn: "Correct answer is C because Rockyou.txt is a common password wordlist.",
    explanationAr: "الإجابة الصحيحة هي C لأن Rockyou.txt عبارة عن wordlist شائعة لكلمات المرور.",
    whyWrong: {
      0: { en: "It is not used to store encrypted files.", ar: "لا تُستخدم لتخزين الملفات المشفرة." },
      1: { en: "It is not a network scanner.", ar: "ليست أداة لفحص الشبكات." },
      3: { en: "It does not monitor traffic.", ar: "لا تراقب الترافيك." }
    }
  },
  {
    question: "25. The -I option in Responder specifies the __________.",
    options: ["A. interface", "B. IP address", "C. password", "D. protocol"],
    answer: 0,
    explanationEn: "Correct answer is A because -I specifies the network interface.",
    explanationAr: "الإجابة الصحيحة هي A لأن -I تحدد واجهة الشبكة.",
    whyWrong: {
      1: { en: "It does not specify the IP address.", ar: "ليست لتحديد عنوان IP." },
      2: { en: "It is not a password.", ar: "ليست كلمة مرور." },
      3: { en: "It is not a protocol.", ar: "ليست بروتوكولًا." }
    }
  },
  {
    question: "26. The command sudo responder -I eth0 -dwPv puts Responder into __________ mode.",
    options: ["A. sleeping", "B. listening", "C. locked", "D. offline"],
    answer: 1,
    explanationEn: "Correct answer is B because Responder runs in listening mode to capture requests.",
    explanationAr: "الإجابة الصحيحة هي B لأن Responder يعمل في وضع الاستماع لالتقاط الطلبات.",
    whyWrong: {
      0: { en: "It is not sleeping mode.", ar: "ليس وضع النوم." },
      2: { en: "It is not locked mode.", ar: "ليس وضع القفل." },
      3: { en: "It is not offline mode.", ar: "ليس وضع عدم الاتصال." }
    }
  },
  {
    question: "27. tun0 interface is used when connected through a VPN.",
    options: ["A. True", "B. False"],
    answer: 0,
    explanationEn: "Correct answer is True because tun0 is commonly used for VPN connections.",
    explanationAr: "الإجابة الصحيحة هي True لأن tun0 شائعة في اتصالات VPN.",
    whyWrong: {
      1: { en: "Wrong because tun0 is often associated with VPNs.", ar: "خطأ لأن tun0 ترتبط غالبًا بالـ VPN." }
    }
  },
  {
    question: "28. DHCP assigns IP addresses permanently to devices.",
    options: ["A. True", "B. False"],
    answer: 1,
    explanationEn: "Correct answer is False because DHCP typically assigns temporary, renewable IP addresses.",
    explanationAr: "الإجابة الصحيحة هي False لأن DHCP عادةً يوزع عناوين مؤقتة قابلة للتجديد.",
    whyWrong: {
      0: { en: "Wrong because the assignment is not permanent.", ar: "خطأ لأن التعيين ليس دائمًا." }
    }
  },
  {
    question: "29. Match the option/protocol with its function.",
    options: ["A. Extract hashes", "B. DHCP related option", "C. Assigns IP dynamically"],
    answer: 1,
    explanationEn: "-d is DHCP related, -w extracts hashes, and DHCP assigns IP dynamically.",
    explanationAr: "-d متعلق بـ DHCP، -w لاستخراج الهاشات، و DHCP يوزع IP ديناميكيًا.",
    whyWrong: {
      0: { en: "This is not the full correct description.", ar: "هذا ليس الوصف الكامل الصحيح." },
      2: { en: "This applies to DHCP itself.", ar: "هذا ينطبق على DHCP نفسه." }
    }
  },
  {
    question: "30. What happens when a victim enters a fake IP (e.g., //192.168.x.x) in File Explorer?",
    options: [
      "A. System crashes",
      "B. Antivirus activates",
      "C. Hashes are captured by attacker",
      "D. Internet disconnects"
    ],
    answer: 2,
    explanationEn: "Correct answer is C because visiting a malicious share can lead to hash capture.",
    explanationAr: "الإجابة الصحيحة هي C لأن الوصول إلى مشاركة خبيثة قد يؤدي إلى التقاط الهاشات.",
    whyWrong: {
      0: { en: "The system does not necessarily crash.", ar: "ليس بالضرورة أن يتعطل النظام." },
      1: { en: "Antivirus does not always react this way.", ar: "مضاد الفيروسات لا يتصرف بهذه الطريقة دائمًا." },
      3: { en: "It does not mean the internet disconnects.", ar: "لا يعني ذلك انقطاع الإنترنت." }
    }
  },

  // ── Q31-40: Pass-the-Hash / Mimikatz ────────────────────────────────────
  {
    question: "31. What is a Pass-the-Hash (PtH) attack?",
    options: [
      "A. Cracking the hash offline using a wordlist",
      "B. Using a captured NTLM hash to authenticate without knowing the plaintext password",
      "C. Sending hashed data over HTTPS",
      "D. Converting a hash to plaintext automatically"
    ],
    answer: 1,
    explanationEn: "Correct answer is B because PtH authenticates using the hash directly, bypassing the need for the plaintext password.",
    explanationAr: "الإجابة الصحيحة هي B لأن هجوم PtH يستخدم الهاش مباشرةً للمصادقة دون الحاجة لكلمة المرور النصية.",
    whyWrong: {
      0: { en: "Cracking offline is a different technique.", ar: "كسر الهاش offline هو أسلوب مختلف." },
      2: { en: "PtH does not involve HTTPS data transmission.", ar: "PtH لا يتعلق بنقل بيانات عبر HTTPS." },
      3: { en: "PtH does not convert hashes to plaintext.", ar: "PtH لا يحول الهاشات إلى نص عادي تلقائيًا." }
    }
  },
  {
    question: "32. Which tool is commonly used to perform Pass-the-Hash attacks?",
    options: ["A. Nmap", "B. Mimikatz", "C. Nikto", "D. Gobuster"],
    answer: 1,
    explanationEn: "Correct answer is B because Mimikatz is widely used to extract and use hashes in PtH attacks.",
    explanationAr: "الإجابة الصحيحة هي B لأن Mimikatz تُستخدم بشكل واسع لاستخراج واستخدام الهاشات في هجمات PtH.",
    whyWrong: {
      0: { en: "Nmap is for network discovery and scanning.", ar: "Nmap للاستكشاف ومسح الشبكات." },
      2: { en: "Nikto is a web server scanner.", ar: "Nikto أداة لفحص خوادم الويب." },
      3: { en: "Gobuster is for directory/DNS brute forcing.", ar: "Gobuster لاكتشاف المجلدات عبر brute force." }
    }
  },
  {
    question: "33. Mimikatz can extract credentials from which Windows process?",
    options: ["A. explorer.exe", "B. lsass.exe", "C. svchost.exe", "D. notepad.exe"],
    answer: 1,
    explanationEn: "Correct answer is B because lsass.exe stores authentication credentials in memory.",
    explanationAr: "الإجابة الصحيحة هي B لأن lsass.exe يخزن بيانات المصادقة في الذاكرة.",
    whyWrong: {
      0: { en: "explorer.exe is the Windows shell, not credential storage.", ar: "explorer.exe هو shell ويندوز وليس مخزن بيانات المصادقة." },
      2: { en: "svchost.exe hosts Windows services but not credential storage.", ar: "svchost.exe يستضيف خدمات ويندوز ولكن ليس مخزن بيانات الاعتماد." },
      3: { en: "notepad.exe is just a text editor.", ar: "notepad.exe مجرد محرر نصوص." }
    }
  },
  {
    question: "34. The Mimikatz command 'sekurlsa::logonpasswords' is used to __________.",
    options: [
      "A. Reset all user passwords",
      "B. Dump credentials stored in memory",
      "C. Create new user accounts",
      "D. Disable Windows Defender"
    ],
    answer: 1,
    explanationEn: "Correct answer is B because this command dumps credentials including NTLM hashes from memory.",
    explanationAr: "الإجابة الصحيحة هي B لأن هذا الأمر يستخرج بيانات الاعتماد بما فيها هاشات NTLM من الذاكرة.",
    whyWrong: {
      0: { en: "The command does not reset passwords.", ar: "الأمر لا يعيد تعيين كلمات المرور." },
      2: { en: "The command does not create accounts.", ar: "الأمر لا ينشئ حسابات جديدة." },
      3: { en: "The command does not disable Windows Defender.", ar: "الأمر لا يعطل Windows Defender." }
    }
  },
  {
    question: "35. Which impacket tool can be used to execute commands via Pass-the-Hash over SMB?",
    options: ["A. impacket-smbserver", "B. impacket-psexec", "C. impacket-sniffer", "D. impacket-ping"],
    answer: 1,
    explanationEn: "Correct answer is B because psexec can authenticate with a hash and execute commands remotely.",
    explanationAr: "الإجابة الصحيحة هي B لأن psexec يمكنه المصادقة بالهاش وتنفيذ أوامر عن بُعد.",
    whyWrong: {
      0: { en: "smbserver sets up an SMB share, not remote execution.", ar: "smbserver ينشئ مشاركة SMB ولا ينفذ أوامر عن بُعد." },
      2: { en: "impacket-sniffer is for sniffing traffic.", ar: "impacket-sniffer لالتقاط الترافيك." },
      3: { en: "There is no impacket-ping tool for this purpose.", ar: "لا توجد أداة impacket-ping لهذا الغرض." }
    }
  },
  {
    question: "36. NTLM hashes can be used directly for authentication without cracking them.",
    options: ["A. True", "B. False"],
    answer: 0,
    explanationEn: "Correct answer is True because Pass-the-Hash attacks use the hash directly for authentication.",
    explanationAr: "الإجابة الصحيحة هي True لأن هجمات Pass-the-Hash تستخدم الهاش مباشرةً للمصادقة.",
    whyWrong: {
      1: { en: "Wrong because NTLM hashes can be passed without cracking.", ar: "خطأ لأن هاشات NTLM يمكن تمريرها دون كسر." }
    }
  },
  {
    question: "37. Which privilege level is needed to run Mimikatz effectively?",
    options: ["A. Guest", "B. Standard User", "C. Administrator", "D. Power User"],
    answer: 2,
    explanationEn: "Correct answer is C because Mimikatz requires administrative privileges to access lsass memory.",
    explanationAr: "الإجابة الصحيحة هي C لأن Mimikatz يحتاج امتيازات المسؤول للوصول إلى ذاكرة lsass.",
    whyWrong: {
      0: { en: "Guest account has insufficient privileges.", ar: "حساب الضيف لا يملك الصلاحيات الكافية." },
      1: { en: "Standard user cannot access lsass memory.", ar: "المستخدم العادي لا يستطيع الوصول إلى ذاكرة lsass." },
      3: { en: "Power User does not have the required elevated access.", ar: "Power User لا يملك الوصول المرتفع المطلوب." }
    }
  },
  {
    question: "38. Which Mimikatz module is used to perform Pass-the-Hash?",
    options: ["A. sekurlsa::wdigest", "B. sekurlsa::pth", "C. lsadump::sam", "D. kerberos::list"],
    answer: 1,
    explanationEn: "Correct answer is B because sekurlsa::pth is the Pass-the-Hash module in Mimikatz.",
    explanationAr: "الإجابة الصحيحة هي B لأن sekurlsa::pth هو وحدة Pass-the-Hash في Mimikatz.",
    whyWrong: {
      0: { en: "wdigest is for extracting plaintext passwords.", ar: "wdigest لاستخراج كلمات المرور النصية." },
      2: { en: "lsadump::sam dumps the SAM database.", ar: "lsadump::sam يستخرج قاعدة بيانات SAM." },
      3: { en: "kerberos::list lists Kerberos tickets.", ar: "kerberos::list يسرد تذاكر Kerberos." }
    }
  },
  {
    question: "39. Which of these is a defense against Pass-the-Hash attacks?",
    options: [
      "A. Disabling SMB signing",
      "B. Enabling Credential Guard",
      "C. Using weaker passwords",
      "D. Disabling Windows Firewall"
    ],
    answer: 1,
    explanationEn: "Correct answer is B because Credential Guard isolates credential data, preventing hash extraction.",
    explanationAr: "الإجابة الصحيحة هي B لأن Credential Guard يعزل بيانات الاعتماد ويمنع استخراج الهاشات.",
    whyWrong: {
      0: { en: "Disabling SMB signing makes attacks easier, not harder.", ar: "تعطيل SMB signing يجعل الهجمات أسهل وليس أصعب." },
      2: { en: "Weaker passwords make systems more vulnerable.", ar: "كلمات المرور الضعيفة تزيد من هشاشة الأنظمة." },
      3: { en: "Disabling the firewall increases attack surface.", ar: "تعطيل جدار الحماية يزيد من سطح الهجوم." }
    }
  },
  {
    question: "40. What type of hash does Windows use for local authentication by default?",
    options: ["A. MD5", "B. SHA-256", "C. NTLM", "D. bcrypt"],
    answer: 2,
    explanationEn: "Correct answer is C because Windows uses NTLM hashes for local authentication.",
    explanationAr: "الإجابة الصحيحة هي C لأن ويندوز يستخدم هاشات NTLM للمصادقة المحلية.",
    whyWrong: {
      0: { en: "MD5 is not used for Windows local authentication.", ar: "MD5 لا يُستخدم للمصادقة المحلية في ويندوز." },
      1: { en: "SHA-256 is not the default Windows auth hash.", ar: "SHA-256 ليس الهاش الافتراضي للمصادقة في ويندوز." },
      3: { en: "bcrypt is used in Linux/Unix, not Windows by default.", ar: "bcrypt يُستخدم في Linux/Unix وليس ويندوز افتراضيًا." }
    }
  },

  // ── Q41-50: Kerberoasting ────────────────────────────────────────────────
  {
    question: "41. What is Kerberoasting?",
    options: [
      "A. An attack on router firmware",
      "B. Requesting service tickets and cracking them offline to get service account passwords",
      "C. Brute-forcing Kerberos authentication",
      "D. Capturing Kerberos traffic with Wireshark"
    ],
    answer: 1,
    explanationEn: "Correct answer is B because Kerberoasting requests TGS tickets and cracks them offline.",
    explanationAr: "الإجابة الصحيحة هي B لأن Kerberoasting يطلب تذاكر TGS ويكسرها offline.",
    whyWrong: {
      0: { en: "Kerberoasting targets Active Directory, not routers.", ar: "Kerberoasting يستهدف Active Directory وليس أجهزة التوجيه." },
      2: { en: "Kerberoasting does not brute-force authentication directly.", ar: "Kerberoasting لا يعتمد على brute-force مباشر للمصادقة." },
      3: { en: "Capturing traffic is not Kerberoasting.", ar: "التقاط الترافيك ليس Kerberoasting." }
    }
  },
  {
    question: "42. Which ticket type is targeted in a Kerberoasting attack?",
    options: ["A. TGT", "B. TGS", "C. PAC", "D. KDC"],
    answer: 1,
    explanationEn: "Correct answer is B because TGS (Ticket Granting Service) tickets are requested and cracked.",
    explanationAr: "الإجابة الصحيحة هي B لأن تذاكر TGS هي التي يتم طلبها وكسرها في هذا الهجوم.",
    whyWrong: {
      0: { en: "TGT is used to request other tickets, not the target here.", ar: "TGT يُستخدم لطلب تذاكر أخرى وليس الهدف هنا." },
      2: { en: "PAC is part of Kerberos tickets but not the target of Kerberoasting.", ar: "PAC جزء من تذاكر Kerberos لكن ليس هدف Kerberoasting." },
      3: { en: "KDC is the Key Distribution Center, not a ticket.", ar: "KDC هو مركز توزيع المفاتيح وليس تذكرة." }
    }
  },
  {
    question: "43. Which tool from Impacket is used for Kerberoasting?",
    options: ["A. impacket-smbserver", "B. impacket-GetNPUsers", "C. impacket-GetUserSPNs", "D. impacket-secretsdump"],
    answer: 2,
    explanationEn: "Correct answer is C because GetUserSPNs requests TGS tickets for accounts with SPNs.",
    explanationAr: "الإجابة الصحيحة هي C لأن GetUserSPNs يطلب تذاكر TGS للحسابات التي تمتلك SPNs.",
    whyWrong: {
      0: { en: "smbserver creates an SMB share server.", ar: "smbserver ينشئ خادم مشاركة SMB." },
      1: { en: "GetNPUsers is used for AS-REP Roasting, not Kerberoasting.", ar: "GetNPUsers يُستخدم في AS-REP Roasting وليس Kerberoasting." },
      3: { en: "secretsdump dumps various secrets but is not the Kerberoasting tool.", ar: "secretsdump يستخرج مختلف الأسرار لكنه ليس أداة Kerberoasting الرئيسية." }
    }
  },
  {
    question: "44. What does SPN stand for in the context of Kerberoasting?",
    options: [
      "A. Security Principal Name",
      "B. Service Principal Name",
      "C. System Process Name",
      "D. Secure Port Number"
    ],
    answer: 1,
    explanationEn: "Correct answer is B because SPN stands for Service Principal Name, used to identify services.",
    explanationAr: "الإجابة الصحيحة هي B لأن SPN اختصار Service Principal Name لتعريف الخدمات.",
    whyWrong: {
      0: { en: "Security Principal Name is not the correct expansion.", ar: "Security Principal Name ليست التوسعة الصحيحة." },
      2: { en: "System Process Name is incorrect.", ar: "System Process Name غير صحيح." },
      3: { en: "Secure Port Number is incorrect.", ar: "Secure Port Number غير صحيح." }
    }
  },
  {
    question: "45. What is needed from an attacker to perform Kerberoasting?",
    options: [
      "A. Domain Admin account",
      "B. Any valid domain user account",
      "C. Local administrator access",
      "D. Physical access to the DC"
    ],
    answer: 1,
    explanationEn: "Correct answer is B because any valid domain user can request TGS tickets.",
    explanationAr: "الإجابة الصحيحة هي B لأن أي مستخدم مجال صالح يستطيع طلب تذاكر TGS.",
    whyWrong: {
      0: { en: "Domain Admin is not required for Kerberoasting.", ar: "لا يلزم حساب Domain Admin لتنفيذ Kerberoasting." },
      2: { en: "Local admin access is not necessary.", ar: "الوصول كمسؤول محلي ليس ضروريًا." },
      3: { en: "Physical access to the DC is not needed.", ar: "الوصول المادي إلى DC غير مطلوب." }
    }
  },
  {
    question: "46. Kerberoasting works by cracking TGS tickets offline.",
    options: ["A. True", "B. False"],
    answer: 0,
    explanationEn: "Correct answer is True because TGS tickets are extracted and cracked offline.",
    explanationAr: "الإجابة الصحيحة هي True لأن تذاكر TGS تُستخرج وتُكسر offline.",
    whyWrong: {
      1: { en: "Wrong because the cracking happens offline.", ar: "خطأ لأن الكسر يحدث offline." }
    }
  },
  {
    question: "47. Hashcat mode 13100 is used to crack which type of hash?",
    options: ["A. NTLM", "B. MD5", "C. Kerberos TGS (RC4)", "D. SHA-1"],
    answer: 2,
    explanationEn: "Correct answer is C because hashcat mode 13100 is for Kerberos 5 TGS-REP (RC4) hashes.",
    explanationAr: "الإجابة الصحيحة هي C لأن hashcat mode 13100 مخصص لهاشات Kerberos 5 TGS-REP (RC4).",
    whyWrong: {
      0: { en: "NTLM uses hashcat mode 1000.", ar: "NTLM يستخدم hashcat mode 1000." },
      1: { en: "MD5 uses hashcat mode 0.", ar: "MD5 يستخدم hashcat mode 0." },
      3: { en: "SHA-1 uses hashcat mode 100.", ar: "SHA-1 يستخدم hashcat mode 100." }
    }
  },
  {
    question: "48. What encryption is commonly used to encrypt TGS tickets (vulnerable to Kerberoasting)?",
    options: ["A. AES-256", "B. 3DES", "C. RC4/NTLM", "D. RSA-2048"],
    answer: 2,
    explanationEn: "Correct answer is C because RC4 encrypted tickets are easier to crack offline.",
    explanationAr: "الإجابة الصحيحة هي C لأن التذاكر المشفرة بـ RC4 أسهل في الكسر offline.",
    whyWrong: {
      0: { en: "AES-256 is stronger and harder to crack.", ar: "AES-256 أقوى وأصعب كسرًا." },
      1: { en: "3DES is stronger than RC4.", ar: "3DES أقوى من RC4." },
      3: { en: "RSA-2048 is asymmetric and not used for ticket encryption.", ar: "RSA-2048 تشفير غير متماثل ولا يُستخدم لتشفير التذاكر." }
    }
  },
  {
    question: "49. Which mitigation helps prevent successful Kerberoasting?",
    options: [
      "A. Using weak passwords for service accounts",
      "B. Using long, complex passwords for service accounts",
      "C. Disabling Kerberos entirely",
      "D. Allowing RC4 encryption on all accounts"
    ],
    answer: 1,
    explanationEn: "Correct answer is B because strong, complex passwords make cracking extracted TGS tickets infeasible.",
    explanationAr: "الإجابة الصحيحة هي B لأن كلمات المرور القوية تجعل كسر تذاكر TGS المستخرجة أمرًا غير عملي.",
    whyWrong: {
      0: { en: "Weak passwords make Kerberoasting more successful.", ar: "كلمات المرور الضعيفة تجعل Kerberoasting أكثر نجاحًا." },
      2: { en: "Disabling Kerberos would break the entire domain.", ar: "تعطيل Kerberos سيكسر Domain بالكامل." },
      3: { en: "Allowing RC4 increases vulnerability.", ar: "السماح بـ RC4 يزيد من الضعف." }
    }
  },
  {
    question: "50. AS-REP Roasting differs from Kerberoasting in that it targets accounts with Kerberos pre-authentication __________.",
    options: ["A. enabled", "B. disabled", "C. encrypted", "D. proxied"],
    answer: 1,
    explanationEn: "Correct answer is B because AS-REP Roasting targets accounts that have pre-authentication disabled.",
    explanationAr: "الإجابة الصحيحة هي B لأن AS-REP Roasting يستهدف الحسابات التي لديها pre-authentication معطلة.",
    whyWrong: {
      0: { en: "Enabled pre-auth prevents AS-REP Roasting.", ar: "تفعيل pre-auth يمنع AS-REP Roasting." },
      2: { en: "Encrypted is not the correct state for this condition.", ar: "Encrypted ليست الحالة الصحيحة لهذا الشرط." },
      3: { en: "Proxied is not related to this concept.", ar: "Proxied لا علاقة له بهذا المفهوم." }
    }
  },

  // ── Q51-60: BloodHound / Active Directory Enumeration ───────────────────
  {
    question: "51. What is BloodHound used for in Active Directory assessments?",
    options: [
      "A. Cracking NTLM hashes",
      "B. Mapping AD relationships and attack paths",
      "C. Scanning for open ports",
      "D. Monitoring network traffic"
    ],
    answer: 1,
    explanationEn: "Correct answer is B because BloodHound visualizes AD relationships to identify attack paths.",
    explanationAr: "الإجابة الصحيحة هي B لأن BloodHound يرسم علاقات AD لتحديد مسارات الهجوم.",
    whyWrong: {
      0: { en: "BloodHound does not crack hashes.", ar: "BloodHound لا يكسر الهاشات." },
      2: { en: "BloodHound does not scan ports.", ar: "BloodHound لا يمسح المنافذ." },
      3: { en: "BloodHound does not monitor network traffic.", ar: "BloodHound لا يراقب ترافيك الشبكة." }
    }
  },
  {
    question: "52. Which tool is used to collect BloodHound data from a domain?",
    options: ["A. Nmap", "B. SharpHound", "C. Hydra", "D. Gobuster"],
    answer: 1,
    explanationEn: "Correct answer is B because SharpHound is the data collector for BloodHound.",
    explanationAr: "الإجابة الصحيحة هي B لأن SharpHound هو جامع البيانات الخاص بـ BloodHound.",
    whyWrong: {
      0: { en: "Nmap is for network scanning.", ar: "Nmap للمسح الشبكي." },
      2: { en: "Hydra is for brute-force attacks.", ar: "Hydra لهجمات brute-force." },
      3: { en: "Gobuster is for directory/DNS brute forcing.", ar: "Gobuster لاكتشاف المجلدات." }
    }
  },
  {
    question: "53. PowerView is a PowerShell tool used to __________.",
    options: [
      "A. Monitor CPU usage",
      "B. Enumerate Active Directory",
      "C. Crack passwords",
      "D. Capture network packets"
    ],
    answer: 1,
    explanationEn: "Correct answer is B because PowerView is used to enumerate Active Directory objects and permissions.",
    explanationAr: "الإجابة الصحيحة هي B لأن PowerView يُستخدم لاستعراض كائنات وأذونات Active Directory.",
    whyWrong: {
      0: { en: "PowerView does not monitor CPU.", ar: "PowerView لا يراقب استخدام CPU." },
      2: { en: "PowerView does not crack passwords.", ar: "PowerView لا يكسر كلمات المرور." },
      3: { en: "PowerView does not capture packets.", ar: "PowerView لا يلتقط الحزم." }
    }
  },
  {
    question: "54. What is the purpose of 'Find-LocalAdminAccess' in PowerView?",
    options: [
      "A. Delete local admin accounts",
      "B. Find machines where the current user has local admin rights",
      "C. List all domain admins",
      "D. Reset local admin passwords"
    ],
    answer: 1,
    explanationEn: "Correct answer is B because Find-LocalAdminAccess identifies machines where the current user has local admin access.",
    explanationAr: "الإجابة الصحيحة هي B لأن Find-LocalAdminAccess تحدد الأجهزة التي يمتلك فيها المستخدم الحالي صلاحيات المسؤول المحلي.",
    whyWrong: {
      0: { en: "The command does not delete accounts.", ar: "الأمر لا يحذف الحسابات." },
      2: { en: "It shows local admin rights, not just domain admins.", ar: "يعرض صلاحيات المسؤول المحلي وليس مسؤولي النطاق فقط." },
      3: { en: "The command does not reset passwords.", ar: "الأمر لا يعيد تعيين كلمات المرور." }
    }
  },
  {
    question: "55. Which BloodHound query helps find the shortest path to Domain Admin?",
    options: [
      "A. List all users",
      "B. Find Shortest Paths to Domain Admins",
      "C. Show all computers",
      "D. List all OUs"
    ],
    answer: 1,
    explanationEn: "Correct answer is B because BloodHound has a built-in query for the shortest attack path to Domain Admin.",
    explanationAr: "الإجابة الصحيحة هي B لأن BloodHound يحتوي على استعلام مدمج لأقصر مسار للوصول إلى Domain Admin.",
    whyWrong: {
      0: { en: "Listing users does not show attack paths.", ar: "سرد المستخدمين لا يظهر مسارات الهجوم." },
      2: { en: "Showing computers does not reveal attack paths.", ar: "عرض أجهزة الحاسوب لا يكشف مسارات الهجوم." },
      3: { en: "Listing OUs does not show shortest attack path.", ar: "سرد الـ OUs لا يظهر أقصر مسار للهجوم." }
    }
  },
  {
    question: "56. BloodHound uses a graph database to represent AD relationships.",
    options: ["A. True", "B. False"],
    answer: 0,
    explanationEn: "Correct answer is True because BloodHound uses Neo4j as its graph database.",
    explanationAr: "الإجابة الصحيحة هي True لأن BloodHound يستخدم Neo4j قاعدة بيانات الرسوم البيانية.",
    whyWrong: {
      1: { en: "Wrong because BloodHound does use a graph database (Neo4j).", ar: "خطأ لأن BloodHound يستخدم فعلًا قاعدة بيانات رسومية (Neo4j)." }
    }
  },
  {
    question: "57. Which command in PowerView is used to get information about domain users?",
    options: ["A. Get-NetComputer", "B. Get-NetUser", "C. Get-NetGroup", "D. Get-NetDomain"],
    answer: 1,
    explanationEn: "Correct answer is B because Get-NetUser retrieves information about domain users.",
    explanationAr: "الإجابة الصحيحة هي B لأن Get-NetUser يسترجع معلومات عن مستخدمي النطاق.",
    whyWrong: {
      0: { en: "Get-NetComputer retrieves computer information.", ar: "Get-NetComputer يسترجع معلومات الأجهزة." },
      2: { en: "Get-NetGroup retrieves group information.", ar: "Get-NetGroup يسترجع معلومات المجموعات." },
      3: { en: "Get-NetDomain retrieves domain information.", ar: "Get-NetDomain يسترجع معلومات النطاق." }
    }
  },
  {
    question: "58. What is the primary goal of AD enumeration in a penetration test?",
    options: [
      "A. Disable the Active Directory service",
      "B. Understand the environment to identify privilege escalation paths",
      "C. Delete domain user accounts",
      "D. Change Group Policy settings"
    ],
    answer: 1,
    explanationEn: "Correct answer is B because enumeration helps the attacker map out targets and escalation opportunities.",
    explanationAr: "الإجابة الصحيحة هي B لأن الاستعراض يساعد المهاجم على رسم خريطة للأهداف وفرص تصعيد الامتيازات.",
    whyWrong: {
      0: { en: "The goal is not to disable AD.", ar: "الهدف ليس تعطيل AD." },
      2: { en: "Deleting accounts is not the primary goal.", ar: "حذف الحسابات ليس الهدف الأساسي." },
      3: { en: "Changing GPO is not the purpose of enumeration.", ar: "تغيير GPO ليس هدف الاستعراض." }
    }
  },
  {
    question: "59. Which tool can be used as an alternative to BloodHound for AD enumeration?",
    options: ["A. Burp Suite", "B. PowerView", "C. Wireshark", "D. Metasploit"],
    answer: 1,
    explanationEn: "Correct answer is B because PowerView is a popular PowerShell-based AD enumeration tool.",
    explanationAr: "الإجابة الصحيحة هي B لأن PowerView أداة استعراض AD شائعة تعتمد على PowerShell.",
    whyWrong: {
      0: { en: "Burp Suite is for web application testing.", ar: "Burp Suite لاختبار تطبيقات الويب." },
      2: { en: "Wireshark analyzes network traffic.", ar: "Wireshark يحلل ترافيك الشبكة." },
      3: { en: "Metasploit is a general exploitation framework.", ar: "Metasploit إطار عمل عام للاستغلال." }
    }
  },
  {
    question: "60. DCSync attack mimics the behavior of a __________.",
    options: ["A. regular user", "B. Domain Controller replication", "C. firewall", "D. DNS server"],
    answer: 1,
    explanationEn: "Correct answer is B because DCSync mimics DC replication to extract credentials from AD.",
    explanationAr: "الإجابة الصحيحة هي B لأن DCSync يحاكي تكرار Domain Controller لاستخراج بيانات الاعتماد من AD.",
    whyWrong: {
      0: { en: "Regular users cannot replicate AD data.", ar: "المستخدمون العاديون لا يستطيعون نسخ بيانات AD." },
      2: { en: "A firewall does not replicate AD.", ar: "جدار الحماية لا ينسخ AD." },
      3: { en: "A DNS server does not perform AD replication.", ar: "خادم DNS لا يقوم بتكرار AD." }
    }
  },

  // ── Q61-70: Token Impersonation ──────────────────────────────────────────
  {
    question: "61. What is Token Impersonation in Windows?",
    options: [
      "A. Creating fake access tokens",
      "B. Using another user's access token to perform actions on their behalf",
      "C. Stealing authentication cookies from a browser",
      "D. Blocking user login tokens"
    ],
    answer: 1,
    explanationEn: "Correct answer is B because Token Impersonation uses another user's access token to act with their privileges.",
    explanationAr: "الإجابة الصحيحة هي B لأن Token Impersonation يستخدم رمز وصول مستخدم آخر للتصرف بامتيازاته.",
    whyWrong: {
      0: { en: "It uses real tokens, not fake ones.", ar: "يستخدم رموز حقيقية وليس مزيفة." },
      2: { en: "Browser cookies are different from Windows access tokens.", ar: "ملفات تعريف الارتباط تختلف عن رموز وصول Windows." },
      3: { en: "Blocking tokens is not the purpose.", ar: "حجب الرموز ليس الهدف." }
    }
  },
  {
    question: "62. Which Metasploit module is used for token impersonation?",
    options: ["A. exploit/windows/smb/psexec", "B. incognito", "C. post/multi/recon/local_exploit_suggester", "D. auxiliary/scanner/smb/smb_ms17_010"],
    answer: 1,
    explanationEn: "Correct answer is B because the incognito module in Meterpreter enables token impersonation.",
    explanationAr: "الإجابة الصحيحة هي B لأن وحدة incognito في Meterpreter تمكّن Token Impersonation.",
    whyWrong: {
      0: { en: "psexec is for remote command execution, not token manipulation.", ar: "psexec للتنفيذ البعيد وليس لمعالجة الرموز." },
      2: { en: "local_exploit_suggester suggests privilege escalation exploits.", ar: "local_exploit_suggester يقترح استغلالات تصعيد الامتيازات." },
      3: { en: "smb_ms17_010 scans for EternalBlue vulnerability.", ar: "smb_ms17_010 يفحص عن ثغرة EternalBlue." }
    }
  },
  {
    question: "63. Which Meterpreter command loads the incognito module?",
    options: ["A. run incognito", "B. load incognito", "C. use incognito", "D. start incognito"],
    answer: 1,
    explanationEn: "Correct answer is B because 'load incognito' loads the module in a Meterpreter session.",
    explanationAr: "الإجابة الصحيحة هي B لأن 'load incognito' يحمّل الوحدة في جلسة Meterpreter.",
    whyWrong: {
      0: { en: "'run incognito' is not the correct command syntax.", ar: "'run incognito' ليس صياغة الأمر الصحيحة." },
      2: { en: "'use' is not the command for loading Meterpreter extensions.", ar: "'use' ليس الأمر لتحميل إضافات Meterpreter." },
      3: { en: "'start incognito' is not a valid command.", ar: "'start incognito' ليس أمرًا صالحًا." }
    }
  },
  {
    question: "64. The 'list_tokens -u' command in incognito lists available tokens by __________.",
    options: ["A. group", "B. username", "C. privilege level", "D. timestamp"],
    answer: 1,
    explanationEn: "Correct answer is B because -u flag lists tokens by username.",
    explanationAr: "الإجابة الصحيحة هي B لأن -u يسرد الرموز حسب اسم المستخدم.",
    whyWrong: {
      0: { en: "-g lists by group, not -u.", ar: "-g يسرد حسب المجموعة وليس -u." },
      2: { en: "Privilege level is not the sorting criterion for -u.", ar: "مستوى الامتياز ليس معيار الترتيب لـ -u." },
      3: { en: "Timestamp is not used as a listing criterion here.", ar: "الطابع الزمني لا يُستخدم كمعيار سرد هنا." }
    }
  },
  {
    question: "65. Token Impersonation requires which Windows privilege?",
    options: ["A. SeBackupPrivilege", "B. SeImpersonatePrivilege", "C. SeShutdownPrivilege", "D. SeTimeZonePrivilege"],
    answer: 1,
    explanationEn: "Correct answer is B because SeImpersonatePrivilege allows a process to impersonate other users.",
    explanationAr: "الإجابة الصحيحة هي B لأن SeImpersonatePrivilege تسمح لعملية بانتحال هوية مستخدمين آخرين.",
    whyWrong: {
      0: { en: "SeBackupPrivilege is for backup operations.", ar: "SeBackupPrivilege مخصص لعمليات النسخ الاحتياطي." },
      2: { en: "SeShutdownPrivilege allows system shutdown.", ar: "SeShutdownPrivilege تسمح بإيقاف تشغيل النظام." },
      3: { en: "SeTimeZonePrivilege changes time zone settings.", ar: "SeTimeZonePrivilege لتغيير إعدادات المنطقة الزمنية." }
    }
  },
  {
    question: "66. Delegation tokens in Windows are more powerful than impersonation tokens.",
    options: ["A. True", "B. False"],
    answer: 0,
    explanationEn: "Correct answer is True because delegation tokens allow network access while impersonation tokens are local.",
    explanationAr: "الإجابة الصحيحة هي True لأن رموز التفويض تسمح بالوصول للشبكة بينما رموز الانتحال تكون محلية فقط.",
    whyWrong: {
      1: { en: "Wrong because delegation tokens have broader access capabilities.", ar: "خطأ لأن رموز التفويض تملك قدرات وصول أوسع." }
    }
  },
  {
    question: "67. Which Meterpreter command is used to impersonate a specific token?",
    options: ["A. token_steal", "B. impersonate_token", "C. use_token", "D. grab_token"],
    answer: 1,
    explanationEn: "Correct answer is B because impersonate_token is the correct incognito command.",
    explanationAr: "الإجابة الصحيحة هي B لأن impersonate_token هو الأمر الصحيح في incognito.",
    whyWrong: {
      0: { en: "token_steal is not a valid command.", ar: "token_steal ليس أمرًا صالحًا." },
      2: { en: "use_token is not a valid incognito command.", ar: "use_token ليس أمرًا صالحًا في incognito." },
      3: { en: "grab_token is not a valid command.", ar: "grab_token ليس أمرًا صالحًا." }
    }
  },
  {
    question: "68. Which attack can be performed after successfully impersonating a Domain Admin token?",
    options: [
      "A. Web application SQL injection",
      "B. Creating new domain admin accounts or extracting secrets",
      "C. Scanning for open ports",
      "D. Phishing email campaigns"
    ],
    answer: 1,
    explanationEn: "Correct answer is B because with DA token, an attacker can perform privileged AD operations.",
    explanationAr: "الإجابة الصحيحة هي B لأنه بامتلاك رمز DA يستطيع المهاجم تنفيذ عمليات AD بامتيازات عالية.",
    whyWrong: {
      0: { en: "SQL injection is a web app attack, unrelated to token impersonation.", ar: "SQL injection هجوم على تطبيقات الويب وغير مرتبط بانتحال الرموز." },
      2: { en: "Scanning ports is a reconnaissance technique, not a DA privilege.", ar: "مسح المنافذ أسلوب استطلاع وليس امتيازًا لـ DA." },
      3: { en: "Phishing is a social engineering attack, not token impersonation.", ar: "التصيد الاحتيالي هجوم هندسة اجتماعية وليس انتحال رموز." }
    }
  },
  {
    question: "69. What does 'rev2self' command do in Meterpreter incognito?",
    options: [
      "A. Escalates to SYSTEM",
      "B. Reverts to the original user token",
      "C. Logs out the current session",
      "D. Creates a new token"
    ],
    answer: 1,
    explanationEn: "Correct answer is B because rev2self reverts back to the original process token.",
    explanationAr: "الإجابة الصحيحة هي B لأن rev2self يعيد إلى الرمز الأصلي للعملية.",
    whyWrong: {
      0: { en: "rev2self does not escalate privileges.", ar: "rev2self لا يرفع الامتيازات." },
      2: { en: "rev2self does not log out the session.", ar: "rev2self لا ينهي الجلسة." },
      3: { en: "rev2self does not create a new token.", ar: "rev2self لا ينشئ رمزًا جديدًا." }
    }
  },
  {
    question: "70. Token Impersonation attacks are only possible on Linux systems.",
    options: ["A. True", "B. False"],
    answer: 1,
    explanationEn: "Correct answer is False because Token Impersonation is a Windows-specific attack concept.",
    explanationAr: "الإجابة الصحيحة هي False لأن Token Impersonation مفهوم هجومي خاص بـ Windows.",
    whyWrong: {
      0: { en: "Wrong because Token Impersonation is a Windows attack, not Linux.", ar: "خطأ لأن Token Impersonation هجوم على Windows وليس Linux." }
    }
  },

  // ── Q71-80: GPP / cPassword / URL File Attacks ───────────────────────────
  {
    question: "71. What does GPP stand for in the context of Active Directory?",
    options: [
      "A. Group Policy Preferences",
      "B. Global Permission Policy",
      "C. General Protocol Parameters",
      "D. Guest Password Protection"
    ],
    answer: 0,
    explanationEn: "Correct answer is A because GPP stands for Group Policy Preferences.",
    explanationAr: "الإجابة الصحيحة هي A لأن GPP اختصار Group Policy Preferences.",
    whyWrong: {
      1: { en: "Global Permission Policy is not correct.", ar: "Global Permission Policy غير صحيح." },
      2: { en: "General Protocol Parameters is not correct.", ar: "General Protocol Parameters غير صحيح." },
      3: { en: "Guest Password Protection is not correct.", ar: "Guest Password Protection غير صحيح." }
    }
  },
  {
    question: "72. In GPP attacks, credentials are stored encrypted with which key?",
    options: ["A. A unique per-domain key", "B. The public Microsoft AES key", "C. A random key per Group Policy", "D. The NTLM hash"],
    answer: 1,
    explanationEn: "Correct answer is B because Microsoft published the AES key used to encrypt cPassword in GPP files.",
    explanationAr: "الإجابة الصحيحة هي B لأن Microsoft نشرت مفتاح AES المستخدم لتشفير cPassword في ملفات GPP.",
    whyWrong: {
      0: { en: "It is not a unique per-domain key.", ar: "ليس مفتاحًا فريدًا لكل نطاق." },
      2: { en: "The key is the same for all, not random per GP.", ar: "المفتاح هو نفسه للجميع وليس عشوائيًا لكل GP." },
      3: { en: "NTLM hash is not used to encrypt GPP passwords.", ar: "هاش NTLM لا يُستخدم لتشفير كلمات مرور GPP." }
    }
  },
  {
    question: "73. Which tool can decrypt cPassword values found in GPP XML files?",
    options: ["A. Nmap", "B. gpp-decrypt", "C. John the Ripper", "D. tcpdump"],
    answer: 1,
    explanationEn: "Correct answer is B because gpp-decrypt decrypts the cPassword using the known AES key.",
    explanationAr: "الإجابة الصحيحة هي B لأن gpp-decrypt يفك تشفير cPassword باستخدام مفتاح AES المعروف.",
    whyWrong: {
      0: { en: "Nmap scans networks, not decrypts passwords.", ar: "Nmap يمسح الشبكات ولا يفك تشفير كلمات المرور." },
      2: { en: "John the Ripper cracks hashes, not GPP passwords.", ar: "John the Ripper يكسر الهاشات وليس كلمات مرور GPP." },
      3: { en: "tcpdump captures network traffic.", ar: "tcpdump يلتقط ترافيك الشبكة." }
    }
  },
  {
    question: "74. GPP cPassword files are stored in which network share?",
    options: ["A. ADMIN$", "B. IPC$", "C. SYSVOL", "D. NETLOGON"],
    answer: 2,
    explanationEn: "Correct answer is C because GPP XML files are located in the SYSVOL share on domain controllers.",
    explanationAr: "الإجابة الصحيحة هي C لأن ملفات GPP XML توجد في مشاركة SYSVOL على Domain Controllers.",
    whyWrong: {
      0: { en: "ADMIN$ is an administrative share, not GPP storage.", ar: "ADMIN$ مشاركة إدارية وليست مخزن GPP." },
      1: { en: "IPC$ is used for inter-process communication.", ar: "IPC$ يُستخدم للتواصل بين العمليات." },
      3: { en: "NETLOGON stores login scripts, not GPP XML.", ar: "NETLOGON يخزن scripts تسجيل الدخول وليس GPP XML." }
    }
  },
  {
    question: "75. What is a URL File Attack?",
    options: [
      "A. Redirecting web traffic using DNS",
      "B. Using a malicious .url file to capture NTLM hashes when opened",
      "C. Sending phishing URLs via email",
      "D. Blocking URLs using a firewall"
    ],
    answer: 1,
    explanationEn: "Correct answer is B because a malicious .url file forces a connection to an attacker's server, capturing hashes.",
    explanationAr: "الإجابة الصحيحة هي B لأن ملف .url خبيث يجبر اتصالًا بخادم المهاجم ملتقطًا الهاشات.",
    whyWrong: {
      0: { en: "DNS redirection is a different technique.", ar: "إعادة توجيه DNS أسلوب مختلف." },
      2: { en: "Phishing emails are social engineering, not URL File Attacks.", ar: "رسائل التصيد هندسة اجتماعية وليست URL File Attacks." },
      3: { en: "Blocking URLs is a defensive measure.", ar: "حجب عناوين URL إجراء دفاعي." }
    }
  },
  {
    question: "76. GPP vulnerabilities were patched by Microsoft in which security bulletin?",
    options: ["A. MS14-068", "B. MS14-025", "C. MS17-010", "D. MS08-067"],
    answer: 1,
    explanationEn: "Correct answer is B because MS14-025 addressed the GPP cPassword vulnerability.",
    explanationAr: "الإجابة الصحيحة هي B لأن MS14-025 عالج ثغرة GPP cPassword.",
    whyWrong: {
      0: { en: "MS14-068 addressed a Kerberos privilege escalation.", ar: "MS14-068 عالج تصعيد امتيازات Kerberos." },
      2: { en: "MS17-010 addressed EternalBlue (SMB).", ar: "MS17-010 عالج ثغرة EternalBlue (SMB)." },
      3: { en: "MS08-067 addressed a Windows Server Service vulnerability.", ar: "MS08-067 عالج ثغرة في Windows Server Service." }
    }
  },
  {
    question: "77. Which Metasploit module can be used to find GPP passwords in SYSVOL?",
    options: [
      "A. exploit/windows/smb/ms17_010_eternalblue",
      "B. post/windows/gather/credentials/gpp",
      "C. auxiliary/scanner/smb/smb_login",
      "D. exploit/multi/handler"
    ],
    answer: 1,
    explanationEn: "Correct answer is B because this module searches SYSVOL for GPP credential files.",
    explanationAr: "الإجابة الصحيحة هي B لأن هذا الوحدة تبحث في SYSVOL عن ملفات بيانات اعتماد GPP.",
    whyWrong: {
      0: { en: "ms17_010_eternalblue exploits SMB, not GPP.", ar: "ms17_010_eternalblue يستغل SMB وليس GPP." },
      2: { en: "smb_login tests SMB credentials, not GPP.", ar: "smb_login يختبر بيانات اعتماد SMB وليس GPP." },
      3: { en: "multi/handler handles incoming shells, not GPP.", ar: "multi/handler يستقبل shells ولا يتعلق بـ GPP." }
    }
  },
  {
    question: "78. PrintNightmare (CVE-2021-1675) is a vulnerability in the Windows __________.",
    options: ["A. DNS service", "B. Print Spooler service", "C. RDP service", "D. IIS web server"],
    answer: 1,
    explanationEn: "Correct answer is B because PrintNightmare exploits the Windows Print Spooler service.",
    explanationAr: "الإجابة الصحيحة هي B لأن PrintNightmare تستغل خدمة Windows Print Spooler.",
    whyWrong: {
      0: { en: "DNS service is not involved in PrintNightmare.", ar: "خدمة DNS غير متورطة في PrintNightmare." },
      2: { en: "RDP service is unrelated to PrintNightmare.", ar: "خدمة RDP غير مرتبطة بـ PrintNightmare." },
      3: { en: "IIS is a web server, unrelated to Print Spooler.", ar: "IIS خادم ويب وغير مرتبط بـ Print Spooler." }
    }
  },
  {
    question: "79. PrintNightmare can allow an attacker to achieve which level of access?",
    options: ["A. Guest", "B. User", "C. SYSTEM", "D. Backup Operator"],
    answer: 2,
    explanationEn: "Correct answer is C because PrintNightmare can lead to SYSTEM-level code execution.",
    explanationAr: "الإجابة الصحيحة هي C لأن PrintNightmare يمكن أن يؤدي إلى تنفيذ كود بمستوى SYSTEM.",
    whyWrong: {
      0: { en: "Guest is far below SYSTEM level.", ar: "مستوى الضيف أقل بكثير من SYSTEM." },
      1: { en: "Standard user access is not the result of this exploit.", ar: "الوصول كمستخدم عادي ليس نتيجة هذا الاستغلال." },
      3: { en: "Backup Operator is less privileged than SYSTEM.", ar: "Backup Operator أقل امتيازًا من SYSTEM." }
    }
  },
  {
    question: "80. Which command disables the Print Spooler service to mitigate PrintNightmare?",
    options: [
      "A. Stop-Service -Name EventLog",
      "B. Stop-Service -Name Spooler; Set-Service -Name Spooler -StartupType Disabled",
      "C. netsh firewall disable",
      "D. sc config Spooler start= auto"
    ],
    answer: 1,
    explanationEn: "Correct answer is B because stopping and disabling the Spooler service mitigates PrintNightmare.",
    explanationAr: "الإجابة الصحيحة هي B لأن إيقاف وتعطيل خدمة Spooler يخفف من خطر PrintNightmare.",
    whyWrong: {
      0: { en: "Stopping EventLog is unrelated to PrintNightmare.", ar: "إيقاف EventLog غير مرتبط بـ PrintNightmare." },
      2: { en: "netsh firewall disable disables the firewall, not Print Spooler.", ar: "netsh firewall disable يعطل جدار الحماية وليس Print Spooler." },
      3: { en: "Setting Spooler to auto enables it, not disables it.", ar: "تعيين Spooler على auto يفعّله وليس يعطله." }
    }
  },

  // ── Q81-90: Post-Exploitation / General PEH ─────────────────────────────
  {
    question: "81. What is the purpose of privilege escalation in penetration testing?",
    options: [
      "A. Reducing system permissions",
      "B. Gaining higher-level access than initially obtained",
      "C. Closing open ports",
      "D. Erasing log files only"
    ],
    answer: 1,
    explanationEn: "Correct answer is B because privilege escalation aims to gain higher access rights than initially acquired.",
    explanationAr: "الإجابة الصحيحة هي B لأن تصعيد الامتيازات يهدف للحصول على صلاحيات أعلى مما تم الحصول عليه أولًا.",
    whyWrong: {
      0: { en: "Reducing permissions is the opposite of escalation.", ar: "تقليل الصلاحيات عكس التصعيد." },
      2: { en: "Closing ports is a defensive action.", ar: "إغلاق المنافذ إجراء دفاعي." },
      3: { en: "Erasing logs is a separate post-exploitation step.", ar: "محو السجلات خطوة منفصلة في ما بعد الاستغلال." }
    }
  },
  {
    question: "82. Which tool is most commonly used for post-exploitation with a Meterpreter shell?",
    options: ["A. Nmap", "B. Metasploit", "C. Wireshark", "D. Burp Suite"],
    answer: 1,
    explanationEn: "Correct answer is B because Metasploit provides Meterpreter for post-exploitation.",
    explanationAr: "الإجابة الصحيحة هي B لأن Metasploit يوفر Meterpreter للعمليات ما بعد الاستغلال.",
    whyWrong: {
      0: { en: "Nmap is for reconnaissance, not post-exploitation.", ar: "Nmap للاستطلاع وليس لما بعد الاستغلال." },
      2: { en: "Wireshark is a traffic analyzer.", ar: "Wireshark محلل ترافيك." },
      3: { en: "Burp Suite is for web application testing.", ar: "Burp Suite لاختبار تطبيقات الويب." }
    }
  },
  {
    question: "83. What does 'hashdump' do in Meterpreter?",
    options: [
      "A. Creates file hashes for integrity checking",
      "B. Dumps NTLM hashes from the SAM database",
      "C. Generates MD5 checksums",
      "D. Verifies digital signatures"
    ],
    answer: 1,
    explanationEn: "Correct answer is B because hashdump extracts password hashes from the Windows SAM database.",
    explanationAr: "الإجابة الصحيحة هي B لأن hashdump يستخرج هاشات كلمات المرور من قاعدة بيانات SAM في Windows.",
    whyWrong: {
      0: { en: "File integrity checking uses different tools.", ar: "فحص سلامة الملفات يستخدم أدوات مختلفة." },
      2: { en: "hashdump does not generate MD5 checksums.", ar: "hashdump لا يولد checksums بصيغة MD5." },
      3: { en: "hashdump does not verify signatures.", ar: "hashdump لا يتحقق من التوقيعات." }
    }
  },
  {
    question: "84. Pivoting in penetration testing means __________.",
    options: [
      "A. Changing the attack tool being used",
      "B. Using a compromised host to access other network segments",
      "C. Logging out of a compromised system",
      "D. Deleting malware after use"
    ],
    answer: 1,
    explanationEn: "Correct answer is B because pivoting uses a compromised machine to reach internal network segments.",
    explanationAr: "الإجابة الصحيحة هي B لأن Pivoting يستخدم جهازًا مخترقًا للوصول إلى شرائح الشبكة الداخلية.",
    whyWrong: {
      0: { en: "Changing tools is not pivoting.", ar: "تغيير الأدوات ليس Pivoting." },
      2: { en: "Logging out is not pivoting.", ar: "تسجيل الخروج ليس Pivoting." },
      3: { en: "Deleting malware is covering tracks, not pivoting.", ar: "حذف البرامج الخبيثة هو إخفاء الأثر وليس Pivoting." }
    }
  },
  {
    question: "85. Which Nmap flag is used to perform an OS detection scan?",
    options: ["A. -sV", "B. -O", "C. -p-", "D. -A"],
    answer: 1,
    explanationEn: "Correct answer is B because -O enables OS detection in Nmap.",
    explanationAr: "الإجابة الصحيحة هي B لأن -O يفعّل اكتشاف نظام التشغيل في Nmap.",
    whyWrong: {
      0: { en: "-sV detects service versions.", ar: "-sV يكتشف إصدارات الخدمات." },
      2: { en: "-p- scans all ports.", ar: "-p- يمسح جميع المنافذ." },
      3: { en: "-A enables aggressive scan including OS, versions, scripts, and traceroute.", ar: "-A يفعّل مسحًا شاملًا يشمل نظام التشغيل والإصدارات والسكريبتات وتتبع المسار." }
    }
  },
  {
    question: "86. What is the purpose of covering tracks after an attack?",
    options: [
      "A. Improving network speed",
      "B. Removing evidence of the intrusion to avoid detection",
      "C. Resetting user passwords",
      "D. Installing updates on the target"
    ],
    answer: 1,
    explanationEn: "Correct answer is B because covering tracks involves removing logs and artifacts to avoid detection.",
    explanationAr: "الإجابة الصحيحة هي B لأن إخفاء الأثر يتضمن إزالة السجلات والأدلة لتجنب الكشف.",
    whyWrong: {
      0: { en: "Covering tracks does not improve network speed.", ar: "إخفاء الأثر لا يحسّن سرعة الشبكة." },
      2: { en: "Resetting passwords is not the purpose of covering tracks.", ar: "إعادة تعيين كلمات المرور ليس هدف إخفاء الأثر." },
      3: { en: "Installing updates is not a post-exploitation cover action.", ar: "تثبيت التحديثات ليس إجراء إخفاء أثر." }
    }
  },
  {
    question: "87. EternalBlue (MS17-010) exploits a vulnerability in which service?",
    options: ["A. FTP", "B. HTTP", "C. SMBv1", "D. DNS"],
    answer: 2,
    explanationEn: "Correct answer is C because EternalBlue exploits a buffer overflow in Windows SMBv1.",
    explanationAr: "الإجابة الصحيحة هي C لأن EternalBlue يستغل ثغرة تجاوز المخزن المؤقت في Windows SMBv1.",
    whyWrong: {
      0: { en: "FTP is not the target of EternalBlue.", ar: "FTP ليس هدف EternalBlue." },
      1: { en: "HTTP is not exploited by EternalBlue.", ar: "HTTP لا يُستغل بواسطة EternalBlue." },
      3: { en: "DNS is not the target of EternalBlue.", ar: "DNS ليس هدف EternalBlue." }
    }
  },
  {
    question: "88. What does a penetration tester do during the 'Reporting' phase?",
    options: [
      "A. Exploits the target system",
      "B. Documents findings, risks, and remediation recommendations",
      "C. Scans for open ports",
      "D. Performs social engineering"
    ],
    answer: 1,
    explanationEn: "Correct answer is B because the reporting phase documents all findings and provides remediation advice.",
    explanationAr: "الإجابة الصحيحة هي B لأن مرحلة التقرير توثق جميع النتائج وتقدم توصيات الإصلاح.",
    whyWrong: {
      0: { en: "Exploitation happens in an earlier phase.", ar: "الاستغلال يحدث في مرحلة سابقة." },
      2: { en: "Port scanning is part of reconnaissance.", ar: "مسح المنافذ جزء من الاستطلاع." },
      3: { en: "Social engineering is part of the attack phase.", ar: "الهندسة الاجتماعية جزء من مرحلة الهجوم." }
    }
  },
  {
    question: "89. Which of the following best describes a 'Zero-Day' vulnerability?",
    options: [
      "A. A vulnerability that has been patched",
      "B. A vulnerability unknown to the vendor with no available patch",
      "C. A vulnerability in outdated software",
      "D. A vulnerability that only affects web applications"
    ],
    answer: 1,
    explanationEn: "Correct answer is B because a Zero-Day is unknown to the vendor and has no patch available yet.",
    explanationAr: "الإجابة الصحيحة هي B لأن Zero-Day ثغرة غير معروفة للمورد ولا يوجد لها تحديث بعد.",
    whyWrong: {
      0: { en: "Patched vulnerabilities are not Zero-Days.", ar: "الثغرات المعالجة ليست Zero-Days." },
      2: { en: "Outdated software vulnerabilities may or may not be Zero-Days.", ar: "ثغرات البرامج القديمة قد تكون أو لا تكون Zero-Days." },
      3: { en: "Zero-Days are not limited to web applications.", ar: "Zero-Days ليست محدودة بتطبيقات الويب." }
    }
  },
  {
    question: "90. What is the primary legal document that authorizes a penetration tester to test a system?",
    options: [
      "A. Non-Disclosure Agreement (NDA)",
      "B. Rules of Engagement (RoE) / Scope of Work",
      "C. Privacy Policy",
      "D. Terms of Service"
    ],
    answer: 1,
    explanationEn: "Correct answer is B because the Rules of Engagement / Scope of Work document authorizes the tester and defines boundaries.",
    explanationAr: "الإجابة الصحيحة هي B لأن وثيقة Rules of Engagement / Scope of Work تخوّل المختبر وتحدد نطاق العمل.",
    whyWrong: {
      0: { en: "NDA covers confidentiality but does not authorize testing.", ar: "NDA يغطي السرية لكن لا يخوّل إجراء الاختبار." },
      2: { en: "Privacy Policy is a general company document, not a pentest authorization.", ar: "سياسة الخصوصية وثيقة عامة للشركة وليست تفويضًا لاختبار الاختراق." },
      3: { en: "Terms of Service is for end-users, not penetration testers.", ar: "شروط الخدمة للمستخدمين النهائيين وليس للمختبرين." }
    }
  }
];

// ─── State ────────────────────────────────────────────────────────────────────
let currentIndex   = 0;
let score          = 0;
let correctCount   = 0;
let wrongCount     = 0;
let skippedCount   = 0;
let shuffledOrder  = [];   // order of quizData indices for current session
let shuffledOpts   = [];   // shuffled option indices for current question
let answered       = false;
let timerInterval  = null;
let timeLeft       = TIMER_SECONDS;
const CIRCUMFERENCE = 2 * Math.PI * 18; // r=18 → 113.1

// ─── Helpers ─────────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Screen control ───────────────────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ─── Timer ────────────────────────────────────────────────────────────────────
function startTimer() {
  timeLeft = TIMER_SECONDS;
  updateTimerUI();
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerUI();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeout();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function updateTimerUI() {
  const timerText = document.getElementById('timer-text');
  const arc       = document.getElementById('timer-arc');
  timerText.textContent = timeLeft;
  const progress  = timeLeft / TIMER_SECONDS;
  arc.style.strokeDashoffset = CIRCUMFERENCE * (1 - progress);
  arc.classList.remove('warn', 'danger');
  if (timeLeft <= 10) arc.classList.add('danger');
  else if (timeLeft <= 15) arc.classList.add('warn');
}

function handleTimeout() {
  if (answered) return;
  answered = true;
  skippedCount++;
  disableOptions();
  const q = quizData[shuffledOrder[currentIndex]];
  const correctShuffledIdx = shuffledOpts.indexOf(q.answer);
  const btns = document.querySelectorAll('.option-btn');
  if (correctShuffledIdx >= 0) btns[correctShuffledIdx].classList.add('correct');
  showFeedback('timeout', null, q);
  showNextButton();
}

// ─── Question Rendering ───────────────────────────────────────────────────────
function loadQuestion() {
  answered = false;
  const qIdx = shuffledOrder[currentIndex];
  const q    = quizData[qIdx];

  // Progress
  const pct = ((currentIndex) / quizData.length) * 100;
  document.getElementById('progress-bar').style.width = pct + '%';
  document.getElementById('question-counter').textContent =
    `Question ${currentIndex + 1} of ${quizData.length}`;
  document.getElementById('score-tracker').textContent = `Score: ${score}`;

  // Question text
  document.getElementById('question-text').textContent = q.question;

  // Shuffle options for this question
  shuffledOpts = shuffle([...Array(q.options.length).keys()]);

  const container = document.getElementById('options-container');
  container.innerHTML = '';
  shuffledOpts.forEach((origIdx, displayIdx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = q.options[origIdx];
    btn.dataset.orig = origIdx;
    btn.addEventListener('click', () => handleAnswer(btn, origIdx, q));
    container.appendChild(btn);
  });

  // Reset feedback
  const fb = document.getElementById('feedback');
  fb.className = 'feedback hidden';
  document.getElementById('next-btn').classList.add('hidden');

  startTimer();
}

// ─── Answer Handling ──────────────────────────────────────────────────────────
function handleAnswer(btn, chosenOrigIdx, q) {
  if (answered) return;
  answered = true;
  stopTimer();
  disableOptions();

  const isCorrect = chosenOrigIdx === q.answer;
  btn.classList.add(isCorrect ? 'correct' : 'wrong');

  if (isCorrect) {
    score++;
    correctCount++;
  } else {
    wrongCount++;
    // Highlight correct
    document.querySelectorAll('.option-btn').forEach(b => {
      if (parseInt(b.dataset.orig) === q.answer) b.classList.add('correct');
    });
  }

  document.getElementById('score-tracker').textContent = `Score: ${score}`;
  showFeedback(isCorrect ? 'correct' : 'wrong', chosenOrigIdx, q);
  showNextButton();
}

function disableOptions() {
  document.querySelectorAll('.option-btn').forEach(b => (b.disabled = true));
}

function showNextButton() {
  document.getElementById('next-btn').classList.remove('hidden');
}

// ─── Feedback ─────────────────────────────────────────────────────────────────
function showFeedback(type, chosenOrigIdx, q) {
  const fb      = document.getElementById('feedback');
  const icon    = document.getElementById('feedback-icon');
  const enEl    = document.getElementById('feedback-en');
  const arEl    = document.getElementById('feedback-ar');

  fb.classList.remove('hidden', 'correct-feedback', 'wrong-feedback', 'timeout-feedback');

  if (type === 'correct') {
    fb.classList.add('correct-feedback');
    icon.textContent  = '✅';
    enEl.textContent  = q.explanationEn;
    arEl.textContent  = q.explanationAr;
  } else if (type === 'wrong') {
    fb.classList.add('wrong-feedback');
    icon.textContent = '❌';
    const wrongEn = q.whyWrong && q.whyWrong[chosenOrigIdx]
      ? q.whyWrong[chosenOrigIdx].en + ' | ' + q.explanationEn
      : q.explanationEn;
    const wrongAr = q.whyWrong && q.whyWrong[chosenOrigIdx]
      ? q.whyWrong[chosenOrigIdx].ar + ' | ' + q.explanationAr
      : q.explanationAr;
    enEl.textContent = wrongEn;
    arEl.textContent = wrongAr;
  } else {
    // timeout
    fb.classList.add('timeout-feedback');
    icon.textContent = '⏱️';
    enEl.textContent = 'Time\'s up! ' + q.explanationEn;
    arEl.textContent = 'انتهى الوقت! ' + q.explanationAr;
  }
}

// ─── Navigation ───────────────────────────────────────────────────────────────
document.getElementById('next-btn').addEventListener('click', () => {
  currentIndex++;
  if (currentIndex >= quizData.length) {
    showResults();
  } else {
    loadQuestion();
  }
});

// ─── Results ─────────────────────────────────────────────────────────────────
function showResults() {
  stopTimer();
  showScreen('results-screen');

  const total   = quizData.length;
  const pct     = Math.round((score / total) * 100);

  document.getElementById('score-pct').textContent  = pct + '%';
  document.getElementById('score-frac').textContent = `${score}/${total}`;
  document.getElementById('stat-correct').textContent = correctCount;
  document.getElementById('stat-wrong').textContent   = wrongCount;
  document.getElementById('stat-skipped').textContent = skippedCount;

  // Animated score arc
  const scoreArc    = document.getElementById('score-arc');
  const SCORE_CIRC  = 2 * Math.PI * 52; // r=52 → 326.7
  setTimeout(() => {
    scoreArc.style.strokeDashoffset = SCORE_CIRC * (1 - pct / 100);
  }, 100);

  // Grade message
  let grade = '';
  if      (pct >= 90) { grade = '🏆 Excellent! / ممتاز!'; document.getElementById('results-icon').textContent = '🏆'; }
  else if (pct >= 75) { grade = '🎉 Very Good! / جيد جداً!'; document.getElementById('results-icon').textContent = '🎉'; }
  else if (pct >= 60) { grade = '👍 Good! / جيد!'; document.getElementById('results-icon').textContent = '👍'; }
  else if (pct >= 50) { grade = '📚 Keep Studying! / واصل الدراسة!'; document.getElementById('results-icon').textContent = '📚'; }
  else                { grade = '💪 Don\'t give up! / لا تستسلم!'; document.getElementById('results-icon').textContent = '💪'; }

  document.getElementById('results-grade').textContent = grade;
  document.getElementById('results-title').textContent = 'Quiz Complete! / انتهى الاختبار!';
  document.getElementById('results-subtitle').textContent =
    `You answered ${correctCount} correctly out of ${total} questions.`;
}

// ─── Restart ─────────────────────────────────────────────────────────────────
document.getElementById('restart-btn').addEventListener('click', startQuiz);

// ─── Start ────────────────────────────────────────────────────────────────────
function startQuiz() {
  currentIndex  = 0;
  score         = 0;
  correctCount  = 0;
  wrongCount    = 0;
  skippedCount  = 0;
  shuffledOrder = shuffle([...Array(quizData.length).keys()]);

  // Reset score arc
  const scoreArc   = document.getElementById('score-arc');
  const SCORE_CIRC = 2 * Math.PI * 52;
  scoreArc.style.strokeDashoffset = SCORE_CIRC;

  showScreen('quiz-screen');
  loadQuestion();
}

document.getElementById('start-btn').addEventListener('click', startQuiz);
